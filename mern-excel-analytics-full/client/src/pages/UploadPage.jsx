import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
export default function UploadPage(){
  const [file,setFile]=useState(null);
  const [msg,setMsg]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    if(!file){ setMsg('Select a file'); return; }
    const fd = new FormData();
    fd.append('file', file);
    try{
      const res = await API.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setMsg('Uploaded');
      nav('/dashboard');
    }catch(err){ setMsg(err.response?.data?.msg || 'Upload failed') }
  }
  return (<div style={{padding:20}}>
    <h2>Upload Excel</h2>
    <form onSubmit={submit}>
      <input type='file' accept='.xls,.xlsx' onChange={e=>setFile(e.target.files[0])} />
      <button>Upload</button>
    </form>
    <p>{msg}</p>
  </div>)
}
