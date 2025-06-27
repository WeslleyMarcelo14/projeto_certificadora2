'use client';

import './style.css';
import { useState, useEffect, useMemo } from 'react';
import { db, firestore } from '@/firebase/configBD';
import { ref, onValue } from 'firebase/database';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import Logo from '@/Components/Logo';

const Motor = () => {
    const [savedData, setSavedData] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        rpm: '',
        corrente: '',
        temperatura: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'descending' });
    const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        try {
            const motorCollection = collection(firestore, 'Motor');
            const motorSnapshot = await getDocs(motorCollection);
            const motorList = motorSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setSavedData(motorList);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        }
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        if (isEditing && editingId) {
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
    
    const handleEdit = (item: any) => {
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

    const handleDelete = async (id: string) => {
        const motorDoc = doc(firestore, 'Motor', id);
        await deleteDoc(motorDoc);
        fetchSavedData();
    };

    const requestSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <>
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

                {isLoading ? (
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        padding: '50px',
                        margin: '20px 0'
                    }}>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>Carregando dados salvos...</p>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            border: '4px solid #f3f3f3', 
                            borderTop: '4px solid #F2C94C', 
                            borderRadius: '50%', 
                            animation: 'spin 1s linear infinite' 
                        }}></div>
                    </div>
                ) : (
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
                            {sortedItems.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                                        Nenhum dado salvo encontrado.
                                    </td>
                                </tr>
                            ) : (
                                sortedItems.map((item) => (
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
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
        
        <Logo />
        </>
    );
};

export default Motor;