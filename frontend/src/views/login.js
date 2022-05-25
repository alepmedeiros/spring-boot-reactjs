import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Button } from '../components/button';
import Card from '../components/card';
import Form from '../components/form';

import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    let navigate = useNavigate();

    const entrar = () => {
        axios.post('http://localhost:8080/v1/usuarios/autenticar',{
            email: email,
            senha: senha
        }).then(resp => {
            console.log(resp);
        }).catch(error => {
            console.log(error.response);
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
                                    change={(e) => setEmail(e.target.value)}
                                    label='E-mail *'
                                    type='email'
                                    placeholder='Digite aqui o seu e-mail'
                                />
                                <Form 
                                    id="password"
                                    value={senha}
                                    change={(e) => setSenha(e.target.value)}
                                    label='Senha *'
                                    type='password'
                                    placeholder='Digite aqui o sua senha'
                                />
                                <Button 
                                    type='success'
                                    label='Entrar'
                                    click={entrar}
                                />
                                <Button 
                                    type='danger'
                                    label='Cadastrar'
                                    click={cadastrarUsuario}
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