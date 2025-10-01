import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const nav = useNavigate();
  async function submit(e){
    e.preventDefault();
    try{
      const res = await API.post('/auth/login',{ email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/dashboard');
    }catch(err){ setErr(err.response?.data?.msg || 'Login failed') }
  }
  return (<div style={{padding:20}}>
    <h2>Login</h2>
    <form onSubmit={submit}>
      <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder='Email' /></div>
      <div><input value={password} onChange={e=>setPassword(e.target.value)} placeholder='Password' type='password' /></div>
      <button>Login</button>
    </form>
    <p>{err}</p>
    <p>Don't have an account? <Link to='/register'>Register</Link></p>
  </div>)
}
