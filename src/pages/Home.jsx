import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import Form from '../components/form/Form'
import ListadoPacientes from '../components/pacientes/ListadoPacientes'
import '../styles/client.css'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})
  const navigate = useNavigate();

  const cerrarSesion = (e) => {
    e.preventDefault();
    localStorage.removeItem('tokenDeUsuario');
    toast.success('¡Sesión Cerrada!')
    navigate('/login')
  } 

  return (
    <div className='client'>
        <h1>Administración de Pacientes de tu <span>Veterinaria</span></h1>
        <button className='logout-button' onClick={cerrarSesion}><img src='../../src/assets/logout-svg.svg'/>Cerrar Sesión</button>
        <div className='client-content'>
            <Form setPacientes={setPacientes} pacientes={pacientes} paciente={paciente} setPaciente={setPaciente}/>
            <ListadoPacientes pacientes={pacientes} setPacientes={setPacientes} setPaciente={setPaciente}/>
        </div>
    </div>
  )
}

export default Home