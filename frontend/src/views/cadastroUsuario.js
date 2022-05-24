import React, { Component } from 'react';
import { Button } from '../components/button';
import Card from '../components/card';
import Form from '../components/form';

export default class CadastroUsuario extends Component {

    state = {
        nome:'',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    cadastrar = () => {
        console.log(this.state);
    }

  render() {
    return (
        <div className='container'>
            <Card title='Cadastro de Usuário'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <Form 
                                id='nome'
                                label='Nome: *'
                                placeholder='Digite seu nome'
                                type='text'
                                value={this.state.nome}
                                change={e => this.setState({nome: e.target.value})}
                            />
                            <Form 
                                id='email'
                                label='E-mail: *'
                                placeholder='Digite o seu email'
                                type='email'
                                value={this.state.email}
                                change={e => this.setState({email: e.target.value})}
                            />
                            <Form 
                                id='senha'
                                label='Senha: *'
                                placeholder='Digite sua senha'
                                type='password'
                                value={this.state.senha}
                                change={e => this.setState({senha: e.target.value})}
                            />
                            <Form 
                                id='senharepeticao'
                                label='Repetir a senha: *'
                                placeholder='Digite novamente sua senha'
                                type='password'
                                value={this.state.senhaRepeticao}
                                change={e => this.setState({senhaRepeticao: e.target.value})}
                            />
                            <Button 
                                type='success'
                                label='Salvar'
                                click={this.cadastrar}
                            />
                            <Button 
                                type='danger'
                                label='Cancelar'
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
  }
}

