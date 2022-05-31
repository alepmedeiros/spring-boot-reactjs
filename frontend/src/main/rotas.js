import React, {useEffect} from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import Login from '../views/login';
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamentos';
import AuthService from '../app/service/authService';

const Redirect = (to) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const RotaAutenticada = ({component: Component,...props}) => {
  return (
    <Route 
      {...props} render={(compoentProps) => {
        if (AuthService.isUsuarioAutenticado) {
          return (
            <Component {...compoentProps} />
          )
        } else {
          return (
            <Redirect to={{pathname: '/login', state: {from: compoentProps.location}}} />
          )
        }
      }}/>

  )

}

const authService = new AuthService();

export const Rotas = () => {
  return (
      <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route path='/home' element={<Home />} />
          <Route path='/consulta-lancamento' element={<ConsultaLancamentos />} />
          <Route path='/cadastro-lancamento/:id' element={<CadastroLancamento />} />
          <Route path='/cadastro-lancamento' element={<CadastroLancamento />} />
      </Routes>
  )
}
