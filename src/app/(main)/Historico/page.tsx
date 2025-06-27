'use client';

import './style.css';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip
} from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { firestore } from '@/firebase/configBD';
import { collection, getDocs } from 'firebase/firestore';
import Logo from '@/Components/Logo';

const formatarData = (createdAt: any, fallback: string) => {
  if (createdAt?.toDate) {
    return createdAt.toDate().toLocaleString('pt-BR');
  }
  if (typeof createdAt === 'string') {
    return new Date(createdAt).toLocaleString('pt-BR');
  }
  return fallback;
};

const Historico = () => {
  const [savedData, setSavedData] = useState([]);
  const [showRPM, setShowRPM] = useState(true);
  const [showCorrente, setShowCorrente] = useState(true);
  const [showTemperatura, setShowTemperatura] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      // Adiciona um delay mínimo para evitar flash de "sem dados"
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchSavedData();
  }, []);

  const sortedItems = useMemo(() => {
    return [...savedData].sort((a, b) => {
      const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
      const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
      return dateA - dateB;
    });
  }, [savedData]);

  const chartData = sortedItems
    .filter(item =>
      item.rpm !== undefined &&
      item.corrente !== undefined &&
      item.temperatura !== undefined
    )
    .map((item, index) => ({
      name: formatarData(item.createdAt, `Leitura ${index + 1}`),
      rpm: Number(item.rpm ?? 0),
      corrente: Number(item.corrente ?? 0),
      temperatura: Number(item.temperatura ?? 0),
    }));

  return (
    <>
    <div>
      <div className="divTabela">
        <div className="box">
          <p className="titulo">HISTÓRICO DE DADOS DO MOTOR</p>
          
          <div className="chart-controls">
            <label>
              <input
                type="checkbox"
                checked={showRPM}
                onChange={() => setShowRPM(!showRPM)}
              />
              <span>RPM</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={showCorrente}
                onChange={() => setShowCorrente(!showCorrente)}
              />
              <span>Corrente (A)</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={showTemperatura}
                onChange={() => setShowTemperatura(!showTemperatura)}
              />
              <span>Temperatura (°C)</span>
            </label>
          </div>
          
          <div className="chart-container">
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px' }}>
                <p style={{ fontSize: '18px', color: '#1a1a1a', fontWeight: '600' }}>Carregando dados históricos...</p>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  border: '4px solid #f3f3f3', 
                  borderTop: '4px solid #F2C94C', 
                  borderRadius: '50%', 
                  animation: 'spin 1s linear infinite' 
                }}></div>
              </div>
            ) : chartData.length === 0 ? (
              <p style={{ color: '#1a1a1a', fontSize: '16px', fontWeight: '500' }}>Nenhum dado disponível.</p>
            ) : (
              <LineChart width={1400} height={650} data={chartData}>
                <CartesianGrid stroke="rgba(242, 201, 76, 0.3)" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#1a1a1a', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis 
                  tick={{ fill: '#1a1a1a', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(242, 201, 76, 0.3)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}
                  labelStyle={{ color: '#1a1a1a', fontWeight: 600 }}
                  itemStyle={{ color: '#1a1a1a' }}
                />
                <Legend 
                  wrapperStyle={{
                    backgroundColor: 'rgba(242, 201, 76, 0.1)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginTop: '15px'
                  }}
                />

                {showRPM && (
                  <Line
                    type="monotone"
                    dataKey="rpm"
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="RPM"
                    dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                  />
                )}

                {showCorrente && (
                  <Line
                    type="monotone"
                    dataKey="corrente"
                    stroke="#82ca9d"
                    strokeWidth={3}
                    name="Corrente (A)"
                    dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                  />
                )}

                {showTemperatura && (
                  <Line
                    type="monotone"
                    dataKey="temperatura"
                    stroke="#ff7f50"
                    strokeWidth={3}
                    name="Temperatura (°C)"
                    dot={{ fill: '#ff7f50', strokeWidth: 2, r: 4 }}
                  />
                )}
              </LineChart>
            )}
          </div>
        </div>
      </div>
    </div>
    
    <Logo />
    </>
  );
};

export default Historico;
