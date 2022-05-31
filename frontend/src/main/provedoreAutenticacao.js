import React, {createContext, useState} from 'react';

import AuthService from '../app/service/authService';

export const AuthContext = createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProveider = AuthContext.Provider;

const ProvedorAutenticacao = (props) => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [isAutenticado, setIsAutenticado] = useState(false);

    const iniciarSessao = (usuario) => {
        console.log(usuario);
        AuthService.logar(usuario);
        setUsuarioAutenticado(usuario);
        setIsAutenticado(true);
    }

    const encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        setIsAutenticado(false);
        setUsuarioAutenticado(null);
    }

    const contexto = {
        usuarioAutenticado: usuarioAutenticado,
        isAutenticado: isAutenticado,
        iniciarSessao: iniciarSessao,
        encerrarSessao: encerrarSessao
    }

    return (
        <AuthProveider value={contexto}>
            {props.children}
        </AuthProveider>
    )
}

export default ProvedorAutenticacao;