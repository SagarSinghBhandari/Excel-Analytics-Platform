import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ViewUpload(){
  const { id } = useParams();
  const [upload, setUpload] = useState(null);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  useEffect(()=>{ load(); },[]);
  async function load(){
    try{
      const res = await API.get('/upload/' + id);
      setUpload(res.data.upload);
    }catch(err){ console.error(err) }
  }
  function renderChart(){
    if(!upload) return;
    const data = upload.parsed;
    const headers = upload.headers || [];
    if(!x || !y){ alert('select axes'); return; }
    const labels = data.map(r => r[x]);
    const values = data.map(r => Number(r[y]) || 0);
    const ctx = document.getElementById('chart').getContext('2d');
    if(window._myChart) window._myChart.destroy();
    window._myChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: y, data: values }] },
    });
  }
  if(!upload) return <div>Loading...</div>;
  return (<div style={{padding:20}}>
    <h3>{upload.originalName}</h3>
    <div>
      <label>X axis:</label>
      <select value={x} onChange={e=>setX(e.target.value)}>
        <option value=''>--select--</option>
        {upload.headers.map(h=> <option key={h} value={h}>{h}</option>)}
      </select>
      <label>Y axis:</label>
      <select value={y} onChange={e=>setY(e.target.value)}>
        <option value=''>--select--</option>
        {upload.headers.map(h=> <option key={h} value={h}>{h}</option>)}
      </select>
      <button onClick={renderChart}>Render</button>
    </div>
    <canvas id='chart' width='800' height='400'></canvas>
  </div>)
}
