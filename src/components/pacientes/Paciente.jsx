import React from 'react'
import './listadoPacientes.css';

const Paciente = ({paciente, eliminarPaciente, setPaciente}) => {
  
  return (
    <div className='paciente'>
        <p><span>Nombre Mascota:</span> {paciente.nombreMascota}</p>
        <p><span>Nombre Propietario:</span> {paciente.nombrePropietario}</p>
        <p><span>Email:</span> {paciente.email}</p>
        <p><span>Fecha de Cita:</span> {new Date(paciente.fechaCita).toISOString().slice(0, 10)}</p>
        <p><span>Sintomas:</span> {paciente.sintomas}</p>
        <div className='paciente-buttons'>
            <button className='editar-button' onClick={() => setPaciente(paciente)}>Editar</button>
            <button className='eliminar-button' onClick={() => eliminarPaciente(paciente._id)}>Eliminar</button>
        </div>
    </div>
  )
}

export default Paciente