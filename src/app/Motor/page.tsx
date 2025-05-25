'use client';

import { useState, useEffect } from 'react';
import './style.css';

const Motor = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        rpm: '',
        velocidade: '',
        tensao: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem('motorData');
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            setData([
                { id: 1, rpm: 1500, velocidade: 2000, tensao: 12.5 },
                { id: 2, rpm: 2000, velocidade: 100, tensao: 13.2 },
                { id: 3, rpm: 1800, velocidade: 90, tensao: 12.8 },
            ]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('motorData', JSON.stringify(data));
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAdd = () => {
        setIsEditing(false);
        setFormData({ id: null, rpm: '', velocidade: '', tensao: '' });
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setFormData({ 
            ...item,
            rpm: item.rpm.toString(),
            velocidade: item.velocidade.toString(),
            tensao: item.tensao.toString()
        });
    };

    const handleSave = () => {
        const newData = {
            id: formData.id,
            rpm: Number(formData.rpm),
            velocidade: Number(formData.velocidade),
            tensao: Number(formData.tensao)
        };

        if (isEditing) {
            setData(data.map(item => item.id === newData.id ? newData : item));
        } else {
            const ids = data.map(item => item.id);
            const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
            setData([...data, { ...newData, id: newId }]);
        }

        setFormData({ id: null, rpm: '', velocidade: '', tensao: '' });
        setIsEditing(false);
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
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
                        />
                    </div>
                    <div className="input-box">
                        <label>Velocidade (km/h)</label>
                        <input
                            type="number"
                            name="velocidade"
                            value={formData.velocidade}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-box">
                        <label>Tensão (V)</label>
                        <input
                            type="number"
                            name="tensao"
                            step="0.1"
                            value={formData.tensao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="divButton">
                        <button onClick={handleSave}>
                            {isEditing ? 'Atualizar' : 'Salvar'}
                        </button>
                        {isEditing && (
                            <button onClick={handleAdd}>Cancelar</button>
                        )}
                    </div>
                </div>

                <table className="tabelaDados">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>RPM</th>
                            <th>Velocidade (km/h)</th>
                            <th>Tensão (V)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.rpm}</td>
                                <td>{item.velocidade}</td>
                                <td>{item.tensao}</td>
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