import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import Card from '../components/card';
import Form from '../components/form';
import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

const CadastroUsuario = () => {
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [senhaRepeticao, setSenhaRepeticao] = useState();

    const service = new UsuarioService();

    let navigate = useNavigate();

    const cadastrar = () => {
        const msgs = validar();

        if(msgs && msgs.length > 0){
            msgs.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        }
        service.salvar(usuario).then(resp => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
            navigate('/login');
        }).catch(erro => {
            mensagemErro(erro.response.data);
        })
    }

    const cancelar = () => {
        navigate('/login');
    }

    const validar = () => {
        const msgs = [];

        if (!nome){
            msgs.push('O campo Nome é obrigatório.')   ;
        }

        if (!email){
            msgs.push('O campo Email é obrigatório')   ;
        } else if(!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um e-mail válido.');
        }

        if(!senha || !senhaRepeticao){
            msgs.push('Informe a senha 2x.');
        } else if(senha !== senhaRepeticao){
            msgs.push('As senhas não batem.')
        }

        return msgs;
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
                            click={cadastrar}
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