import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Button } from 'primereact/button';
import Card from '../components/card';
import Form from '../components/form';
import UsuarioServices from '../app/service/usuarioService';
import LocalStorageservice from '../app/service/localStorageService';
import { mensagemErro } from '../components/toastr';
import ProvedorAutenticacao from '../main/provedoreAutenticacao';

const Login = () => {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    const service = new UsuarioServices();

    let navigate = useNavigate();

    const entrar = () => {
        service.autenticar({
            email: email,
            senha: senha
        }).then(resp => {
            LocalStorageservice.addItem('usuario_logado', resp.data);
            navigate('/home');
        }).catch(erro => {
            mensagemErro(erro.response.data);
        });
    }

    const cadastrarUsuario = () => {
        navigate('/cadastro-usuario');
    } 
    
    return(
    <div className='row'>
        <div className='col-md-6' style={ {position: 'relative', left: '300px', marginTop: 50} }>
            <div className='bs-docs-section'>
                <Card title='Login'>
                    
                    <div className='row'>
                        <div className='col-lg-12'> 
                            <div className='bs-component'>
                                <Form 
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label='E-mail *'
                                    type='email'
                                    placeholder='Digite aqui o seu e-mail'
                                />
                                <Form 
                                    id="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    label='Senha *'
                                    type='password'
                                    placeholder='Digite aqui o sua senha'
                                />
                                <Button 
                                    style={{marginTop: 5, marginRight: 5}}
                                    className='p-button-success'
                                    icon='pi pi-sign-in'
                                    label='Entrar'
                                    onClick={entrar}
                                />
                                <Button 
                                    style={{marginTop: 5, marginRight: 5}}
                                    className='p-button-secondary'
                                    icon='pi pi-plus'
                                    label='Cadastrar'
                                    onClick={cadastrarUsuario}
                                />                                       
                            </div>                                     
                        </div>
                    </div>
                </Card> 
            </div>
        </div>
    </div>
)
}

export default Login;