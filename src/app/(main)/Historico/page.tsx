'use client';

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip
} from 'recharts';
import { useState, useEffect, useMemo } from 'react';
import { firestore } from '@/firebase/configBD';
import { collection, getDocs } from 'firebase/firestore';

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
    <div style={{ padding: '20px', textAlign: 'center'}}>
      <h2>Gráfico Unificado com Opções de Linha</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={showRPM}
            onChange={() => setShowRPM(!showRPM)}
          />
          <span style={{ marginLeft: '8px', marginRight: '20px' }}>RPM</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showCorrente}
            onChange={() => setShowCorrente(!showCorrente)}
          />
          <span style={{ marginLeft: '8px', marginRight: '20px' }}>Corrente (A)</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTemperatura}
            onChange={() => setShowTemperatura(!showTemperatura)}
          />
          <span style={{ marginLeft: '8px' }}>Temperatura (°C)</span>
        </label>
      </div>
      {chartData.length === 0 ? (
        <p>Nenhum dado disponível.</p>
      ) : (
        <LineChart width={2000} height={800} data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {showRPM && (
            <Line
              type="monotone"
              dataKey="rpm"
              stroke="#8884d8"
              strokeWidth={2}
              name="RPM"
            />
          )}

          {showCorrente && (
            <Line
              type="monotone"
              dataKey="corrente"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Corrente (A)"
            />
          )}

          {showTemperatura && (
            <Line
              type="monotone"
              dataKey="temperatura"
              stroke="#ff7f50"
              strokeWidth={2}
              name="Temperatura (°C)"
            />
          )}
        </LineChart>
      )}
    </div>
  );
};

export default Historico;
