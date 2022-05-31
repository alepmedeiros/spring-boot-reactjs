import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
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
        console.log('usuario',loggedUser.id);
        service.obterSaldoPorUsuario(loggedUser.id).then(resp => {
                setSaldo(resp.data);
                console.log(resp.data);
            }).catch(erro => {
                console.log(erro.response);
            })
    }

    useEffect(() => {
        buscarSaldo();
        console.log('saldo: ', saldo);
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
            label='Cadastrar Usuário'
            style={{marginTop: 5, marginRight: 5}}
            className='p-button-success'
            click={cadastrosUsuario}
            icon='pi pi-user'
        />
        <Button 
            label='Cadastrar Lançamento'
            className='p-button-danger'
            onClick={cadastroLancamento}
            icon="pi pi-dollar"
        />
        </p>
    </div>
  )
}

export default Home;