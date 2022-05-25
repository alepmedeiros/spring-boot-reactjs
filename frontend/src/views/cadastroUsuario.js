import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import Card from '../components/card';
import Form from '../components/form';

const CadastroUsuario = () => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhaRepeticao, setSenhaRepeticao] = useState();

    let navigate = useNavigate();

    const cancelar = () => {
        navigate('/login');
    }

    return (
        <Card title='Cadastro de Usuário'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <Form 
                            id='nome'
                            label='Nome: *'
                            placeholder='Digite seu nome'
                            type='text'
                            value={nome}
                            change={e =>setNome(e.target.value)}
                        />
                        <Form 
                            id='email'
                            label='E-mail: *'
                            placeholder='Digite o seu email'
                            type='email'
                            value={email}
                            change={e => setEmail(e.target.value)}
                        />
                        <Form 
                            id='senha'
                            label='Senha: *'
                            placeholder='Digite sua senha'
                            type='password'
                            value={senha}
                            change={e => setSenha(e.target.value)}
                        />
                        <Form 
                            id='senharepeticao'
                            label='Repetir a senha: *'
                            placeholder='Digite novamente sua senha'
                            type='password'
                            value={senhaRepeticao}
                            change={e => setSenhaRepeticao(e.target.value)}
                        />
                        <Button 
                            type='success'
                            label='Salvar'
                        />
                        <Button 
                            type='danger'
                            label='Cancelar'
                            click={cancelar}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CadastroUsuario;