import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import UsuarioService from '../app/service/usuarioService';
import LocalStorageservice from '../app/service/localStorageService';

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    let navigate = useNavigate();

    const service = new UsuarioService();

    const cadastrosUsuario = () => {
        navigate('/cadastro-usuario');
    }

    const cadastroLancamento = () => {
        navigate('/cadastro-lancamento');
    }

    const buscarSaldo = () => {
        const loggedUser = LocalStorageservice.obtemItem('usuario_logado');
        service.obterSaldoPorUsuario(loggedUser.id).then(resp => {
                setSaldo(resp.data);
            }).catch(erro => {
                console.log(erro.response);
            })
    }

    useEffect(() => {
        buscarSaldo();
    });

  return (
    <div className="jumbotron">
        <h1 className="display-3">Bem vindo!</h1>
        <p className="lead">Esse é seu sistema de finanças.</p>
        <p className="lead">Seu saldo para o mês atual é de R$ {saldo}</p>
        <hr className="my-4" />
        <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
        <p className="lead">
        <Button 
            type='primary btn-lg'
            label='Cadastrar Usuário'
            click={cadastrosUsuario}
            icon='users'
        />
        <Button 
            type='danger btn-lg'
            label='Cadastrar Lançamento'
            click={cadastroLancamento}
            icon='users'
        />
        </p>
    </div>
  )
}

export default Home