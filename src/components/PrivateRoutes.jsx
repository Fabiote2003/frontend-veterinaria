import React from 'react'
import useAuth from '../hooks/useAuth'
import {Outlet, Navigate} from 'react-router-dom'
const PrivateRoutes = () => {
  const {auth} = useAuth();

  if(auth === undefined) return 'Cargando...'

  return auth === true ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes