//src/pages/Homes.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Toolbar } from '@mui/material';
export default function Home() {
  const { user, isLoggedIn, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Indicador de carga
  }
  if (!isLoggedIn || !user) {
    // Si no hay sesión activa o no hay usuario, redirige o muestra un mensaje
    return <div>Access denied. Please log in.</div>;
  }
  // Renderiza el contenido solo si todo es válido
  return (
    <div>
      <Toolbar />
    </div>
  );
}
