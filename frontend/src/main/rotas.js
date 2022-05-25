import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CadastroLancamento from '../views/cadastroLancamento';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import Login from '../views/login';

export const Rotas = () => {
  return (
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route path='/cadastro-lancamento' element={<CadastroLancamento />} />
      </Routes>
  )
}
