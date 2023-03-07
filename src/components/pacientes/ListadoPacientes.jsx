import React, { useEffect, useState } from 'react'
import './listadoPacientes.css';
import Paciente from './Paciente';
import axios from 'axios'
import { toast } from 'react-hot-toast';

const ListadoPacientes = ({setPacientes, pacientes, setPaciente}) => {

  const token = localStorage.getItem('tokenDeUsuario');
      
  const config = {
          headers: {
              "Content-Type": "application/json",
              "x-token": `${token}`
          }
      }

  const eliminarPaciente = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${id}`, config);
      toast.success('Paciente eliminado.');
      const pacientesActualizados = pacientes.filter(paciente => paciente._id !== id);
      setPacientes(pacientesActualizados);
    } catch (error) {
      console.log(error);
      toast.error('No se pudo eliminar el paciente.')
    }
  }
 
  
  useEffect(() => {
    const obtenerClientes = async () => {

      try {
        const res = await axios('http://localhost:8080/api/clientes/', config);
        setPacientes(res.data.clientes)
      } catch (error) {
          console.log(error.response.data.msg);
      }
      
    }
    
    obtenerClientes();
  }, [])

  return (
    <div className='listado-pacientes'>
        <h2>Listado de pacientes</h2>
        <p>Administra tus <span>Pacientes</span></p>
        {pacientes.length > 0 ? (
          <div className='listado-pacientes-items'>
          {pacientes.map(paciente => (
              <Paciente 
              key={paciente._id}
              paciente={paciente}
              eliminarPaciente={eliminarPaciente}
              setPaciente={setPaciente}
              />
            )
          )}
        </div>
        ) : (
          <p>No hay Pacientes todavía. Agreguelos!</p>
        )}
        
    </div>
  )
}

export default ListadoPacientes