import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
export default function Dashboard(){
  const [uploads,setUploads]=useState([]);
  useEffect(()=>{ load(); },[]);
  async function load(){
    try{ const res = await API.get('/upload'); setUploads(res.data.uploads); }catch(err){ console.error(err) }
  }
  return (<div style={{padding:20}}>
    <h2>Dashboard</h2>
    <p><Link to='/upload'>Upload new file</Link></p>
    <ul>
      {uploads.map(u => (<li key={u._id}>
        <Link to={'/upload/'+u._id}>{u.originalName} — {new Date(u.createdAt).toLocaleString()}</Link>
      </li>))}
    </ul>
  </div>)
}
