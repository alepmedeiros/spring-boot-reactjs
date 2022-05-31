import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
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
        const usuario = {
            nome,
            email,
            senha,
            senhaRepeticao
        }

        try {
            service.validar(usuario);
        } catch (error) {
            const msg = error.mensagens;
            msg.forEach(msg => mensagemErro(msg));
            return false;
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
                            onChange={e =>setNome(e.target.value)}
                        />
                        <Form 
                            id='email'
                            label='E-mail: *'
                            placeholder='Digite o seu email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form 
                            id='senha'
                            label='Senha: *'
                            placeholder='Digite sua senha'
                            type='password'
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                        />
                        <Form 
                            id='senharepeticao'
                            label='Repetir a senha: *'
                            placeholder='Digite novamente sua senha'
                            type='password'
                            value={senhaRepeticao}
                            onChange={e => setSenhaRepeticao(e.target.value)}
                        />
                        <Button 
                            label='Salvar'
                            onClick={cadastrar}
                            style={{marginTop: 5, marginRight: 5}}
                            className='p-button-success'
                            icon='pi pi-save'
                        />
                        <Button 
                            label='Cancelar'
                            onClick={cancelar}
                            style={{marginTop: 5, marginRight: 5}}
                            className='p-button-danger'
                            icon='pi pi-times'
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CadastroUsuario;