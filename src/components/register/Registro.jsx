import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import './register.css'

const Registro = () => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 

  const register = async (e) => {
    e.preventDefault();
    const user = {
      nombre, 
      apellido,
      email,
      password
    }

    try {
      const res = await axios.post('http://localhost:8080/api/usuarios/', user);
      toast.success(res.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error('Register Failed');
    }

  }

  const navegarAInicio = (e) => {
    navigate('/login');
  }

  return (
    <div className='registro'>
        <div className="registro-content">
          <h1>¡Registrate!</h1>
          <form onSubmit={register}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id='nombre' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}/>
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id='apellido' placeholder='Apellido' value={apellido} onChange={(e) => setApellido(e.target.value)}/>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id='password'placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className='register-button' type="submit">Registrarse</button>
          </form>
          <p className='register-advice'>¿Ya tienes una cuenta? <a onClick={navegarAInicio}>Inicia sesión.</a></p>
        </div>
        <div className="registro-info">
          <h1>¡Bienvenido, empieza ya a administrar tu veterinaria!</h1>
          <img src="../../src/assets/perro.png" alt="Foto de perro" />
        </div>
    </div>
  )
}

export default Registro