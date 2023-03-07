import React, { useEffect } from 'react';
import './form.css';
import { useState } from 'react';
import axios from 'axios';
import {toast} from  'react-hot-toast'
const Form = ({setPacientes, pacientes, paciente, setPaciente}) => {
    

    const [nombreMascota, setNombreMascota] = useState('');
    const [nombrePropietario, setNombrePropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fechaCita, setFechaCita] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const rellenarFormulario = () => {
            if(Object.keys(paciente).length > 0) {
                setNombreMascota(paciente.nombreMascota);
                setNombrePropietario(paciente.nombrePropietario);
                setEmail(paciente.email);
                setFechaCita(new Date(paciente.fechaCita).toISOString().slice(0, 10));
                setSintomas(paciente.sintomas);
            }
        }
        rellenarFormulario();
    }, [paciente])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([ nombreMascota, nombrePropietario, email, fechaCita, sintomas ].includes('') ) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        

        const objetoPaciente = {
            nombrePropietario,
            nombreMascota, 
            email, 
            fechaCita, 
            sintomas,
        }

        const token = localStorage.getItem('tokenDeUsuario');
        const config = {
            headers: {
                "Content-Type": "application/json",
                "x-token": `${token}`
            }
        }

        if(paciente._id) {
            const objetoAEditar = {
                nombrePropietario,
                nombreMascota, 
                email, 
                fechaCita, 
                sintomas,
                _id: paciente._id
            }
            try {
                const res = await axios.put(`http://localhost:8080/api/clientes/${paciente._id}`, objetoAEditar, config );
                toast.success('¡Paciente Actualizado!');
                setPaciente({});
                setEmail('');
                setFechaCita('');
                setNombreMascota('');
                setNombrePropietario('');
                setSintomas('');
                let pacientesActualizados = [];
                for(let index = 0; index < pacientes.length; index++) {
                    if(paciente._id === pacientes[index]._id) {
                        pacientesActualizados = [...pacientesActualizados, objetoAEditar];
                    }else {
                        pacientesActualizados = [...pacientesActualizados, pacientes[index]];
                    }
                }
                setPacientes(pacientesActualizados)
                return;
            } catch (error) {
                console.log(error);
                return;
            }
            
        }

        try {
                const res = await axios.post('http://localhost:8080/api/clientes/', objetoPaciente, config );
                toast.success('¡Paciente Agregado!');
                setPacientes([...pacientes, res.data]);
                setEmail('');
                setFechaCita('');
                setNombreMascota('');
                setNombrePropietario('');
                setSintomas('');
            } catch (error) {
                console.log(error)
            }    
    }
   

  return (
        <div className="client-form">
                <h2>Seguimiento Pacientes</h2>
                <p>Añade Pacientes y 
                <span> Administralos</span>
                </p>
                {error && (<p className='error'>Todos los campos son obligatorios</p>)}
                <form onSubmit={handleSubmit}>
                    
                    <div>
                        <label htmlFor="mascota">Nombre Mascota</label>
                        <input id="mascota" type="text" placeholder='Nombre Mascota' value={nombreMascota} onChange={(e) => setNombreMascota(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="propietario">Nombre Propietario</label>
                        <input id="propietario" type="text" placeholder='Nombre Propietario' value={nombrePropietario} onChange={(e) => setNombrePropietario(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email del Propietario</label>
                        <input id="email" type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="date">Fecha de Cita</label>
                        <input id="date" type="date" placeholder='Fecha de cita' value={fechaCita} onChange={(e) => setFechaCita(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='sintomas'>Sintomas</label>
                        <textarea id='sintomas' placeholder='Sintomas' value={sintomas} onChange={(e) => setSintomas(e.target.value)}/>
                    </div>
                    <button className='submmit-button' type="submit">{paciente._id ? 'Editar' : 'Agregar'}</button>
                </form>

        </div>
  )
}

export default Form