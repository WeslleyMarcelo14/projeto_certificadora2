'use client';

import './style.css';
import { useState, useEffect, useMemo } from 'react';
import { db, firestore } from '@/firebase/configBD';
import { ref, onValue } from 'firebase/database';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

const Motor = () => {
    const [savedData, setSavedData] = useState([]);
    const [formData, setFormData] = useState({
        rpm: '',
        corrente: '',
        temperatura: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });

    useEffect(() => {
        const motorRef = ref(db, 'Motor');
        const unsubscribe = onValue(motorRef, (snapshot) => {
            const liveData = snapshot.val();
            if (liveData && !isEditing) {
                setFormData({
                    rpm: liveData.RPM,
                    corrente: liveData.Corrente,
                    temperatura: liveData.Temperatura
                });
            }
        });
        return () => unsubscribe();
    }, [isEditing]);

    const fetchSavedData = async () => {
        const motorCollection = collection(firestore, 'Motor');
        const motorSnapshot = await getDocs(motorCollection);
        const motorList = motorSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setSavedData(motorList);
    };

    useEffect(() => {
        fetchSavedData();
    }, []);

    const sortedItems = useMemo(() => {
        let sortableItems = [...savedData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;
                
                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [savedData, sortConfig]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        if (isEditing) {
            const motorDoc = doc(firestore, 'Motor', editingId);
            await updateDoc(motorDoc, {
                rpm: Number(formData.rpm),
                corrente: Number(formData.corrente),
                temperatura: Number(formData.temperatura),
            });
        } else {
            await addDoc(collection(firestore, 'Motor'), {
                rpm: Number(formData.rpm),
                corrente: Number(formData.corrente),
                temperatura: Number(formData.temperatura),
                createdAt: Timestamp.fromDate(new Date()),
            });
        }
        fetchSavedData();
    };
    
    const handleEdit = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            rpm: item.rpm,
            corrente: item.corrente,
            temperatura: item.temperatura,
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ rpm: '', corrente: '', temperatura: '' }); 
    };

    const handleDelete = async (id) => {
        const motorDoc = doc(firestore, 'Motor', id);
        await deleteDoc(motorDoc);
        fetchSavedData();
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <div className="divTabela">
                <div className="box">
                    <p className="titulo">DADOS DO MOTOR</p>
                    <div className="input-box">
                        <label>RPM</label>
                        <input
                            type='number'
                            name='rpm'
                            value={formData.rpm}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input-box">
                        <label>Corrente (A)</label>
                        <input
                            type="number"
                            name="corrente"
                            value={formData.corrente}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="input-box">
                        <label>Temperatura (°C)</label>
                        <input
                            type="number"
                            name="temperatura"
                            step="0.1"
                            value={formData.temperatura}
                            onChange={handleInputChange}
                            readOnly={!isEditing}
                        />
                    </div>
                    <div className="divButton">
                        <button onClick={handleSave}>
                            {isEditing ? 'Atualizar Registro' : 'Salvar Leitura Atual'}
                        </button>
                        {isEditing && (
                            <button onClick={handleCancelEdit}>Cancelar Edição</button>
                        )}
                    </div>
                </div>

                <table className="tabelaDados">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('createdAt')} style={{cursor: 'pointer'}}>
                                Data da Leitura
                                {sortConfig.key === 'createdAt' && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => requestSort('rpm')} style={{cursor: 'pointer'}}>
                                RPM
                                {sortConfig.key === 'rpm' && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => requestSort('corrente')} style={{cursor: 'pointer'}}>
                                Corrente (A)
                                {sortConfig.key === 'corrente' && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                            </th>
                            <th onClick={() => requestSort('temperatura')} style={{cursor: 'pointer'}}>
                                Temperatura (°C)
                                {sortConfig.key === 'temperatura' && (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼')}
                            </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.createdAt ? item.createdAt.toDate().toLocaleString('pt-BR') : 'N/D'}
                                </td>
                                <td>{item.rpm}</td>
                                <td>{item.corrente}</td>
                                <td>{item.temperatura}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)}>Editar</button>
                                    <button onClick={() => handleDelete(item.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Motor;