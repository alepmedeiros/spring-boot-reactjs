import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import Login from '../views/login';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';

export const Rotas = () => {
  return (
      <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route path='/consulta-lancamento' element={<ConsultaLancamentos />} />
      </Routes>
  )
}
