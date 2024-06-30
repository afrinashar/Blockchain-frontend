import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchBlockchain = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/blockchain', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlockchain(res.data);
    };
    fetchBlockchain();
  }, []);

  const handleAddBlock = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5001/api/blockchain/add-block', { data }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setData('');
    const res = await axios.get('http://localhost:5001/api/blockchain', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBlockchain(res.data);
  };

  return (
    <div>
      <h1>Blockchain Dashboard</h1>
      <form onSubmit={handleAddBlock}>
        <input type="text" value={data} onChange={(e) => setData(e.target.value)} placeholder="Data" required />
        <button type="submit">Add Block</button>
      </form>
      <h2>Blockchain</h2>
      <ul>
        {blockchain.map((block) => (
          <li key={block.hash}>
            <p>Index: {block.index}</p>
            <p>Data: {JSON.stringify(block.data)}</p>
            <p>Previous Hash: {block.previousHash}</p>
            <p>Hash: {block.hash}</p>
            <p>Timestamp: {new Date(block.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
