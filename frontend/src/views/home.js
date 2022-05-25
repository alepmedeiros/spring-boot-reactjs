import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button'

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    let navigate = useNavigate();

    const cadastrosUsuario = () => {
        navigate('/cadastro-usuario');
    }

    const cadastroLancamento = () => {
        navigate('/cadastro-lancamento');
    }

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
            ico='users'
            label='Cadastrar Usuário'
            click={cadastrosUsuario}
        />
        <Button 
            type='danger btn-lg'
            ico='users'
            label='Cadastrar Lançamento'
            click={cadastroLancamento}
        />
        </p>
    </div>
  )
}

export default Home