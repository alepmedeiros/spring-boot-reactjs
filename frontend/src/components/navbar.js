import React from 'react';
import NavBarItem from './navbaritem';
import AuthService from '../app/service/authService';

const deslogar = () => {
  AuthService.removerUsuarioAutenticado();
}

const isUsuarioAutenticado = () => {
  return AuthService.isUsuarioAutenticado();
}

export default function NavBar() {
    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
              <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
              <button className="navbar-toggler" 
                type="button" data-toggle="collapse" 
                data-target="#navbarResponsive" 
                aria-controls="navbarResponsive" 
                aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav">
                      <NavBarItem 
                        render={isUsuarioAutenticado}
                        link='/home'
                        label='Home'
                      />
                      <NavBarItem 
                        render={isUsuarioAutenticado}
                        link='/cadastro-usuario'
                        label='Usuários'
                      />
                      <NavBarItem 
                        render={isUsuarioAutenticado}
                        link='/consulta-lancamento'
                        label='Lançamentos'
                      />
                      <NavBarItem 
                        render={isUsuarioAutenticado}
                        onClick={deslogar}
                        link='/login'
                        label='Sair'
                      />
                  </ul>

              </div>
          </div>
      </div>
  )
}