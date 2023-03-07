import React, { useEffect, useState } from 'react'
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const login = async (e) => {
    e.preventDefault();

    if([email, password].includes('')) {
      console.log("Todos los campos son obligatorios");
      toast.error("Todos los campos son obligatorios");
      return;
    }

    const user = {
      email,
      password
  }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", user);
      localStorage.setItem('tokenDeUsuario', res.data.token);
      toast.success("¡Sesión Iniciada!");
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error);
    }
  }

  const registrarUsuario = (e) => {
    navigate('/registro');
  }

  return (
    <div className='login'>
        <div className='login-info'>
            <h1>¡Administra tu veterinaria con nosotros!</h1>
            <img className='logo-image' src="../../src/assets/vet-logo.jpg" alt="sdfsd" />
        </div>
        <div className='login-container'>
            <h2>!Hola de nuevo!</h2>
            <form
              onSubmit={login}
            >
                <label>Email</label>
                <input type="email" placeholder='Correo electronico' value={email} onChange={e => setEmail(e.target.value)} />
                <label>Contraseña</label>
                <input type="password" value={password} placeholder='Contraseña'
                onChange={e => setPassword(e.target.value)} />
                <button className='login-button' type="submit">Iniciar sesión</button>
            </form>
            
            <p className='login-advice'>¿No tienes una cuenta? <a onClick={registrarUsuario}>Registrate</a></p>
        </div>
    </div>
  )
}

export default Login