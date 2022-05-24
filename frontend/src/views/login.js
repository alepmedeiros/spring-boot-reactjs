import { Component } from 'react';
import { Button } from '../components/button';
import Card from '../components/card';
import Form from '../components/form';

class Login extends Component {

    state = {
        email:'',
        senha:''
    }

    entrar = () => {
        console.log(this.state);
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6' style={ {position: 'relative', left: '300px', marginTop: 50} }>
                        <div className='bs-docs-section'>
                            <Card title='Login'>
                                <div className='row'>
                                    <div className='col-lg-12'> 
                                        <div className='bs-component'>
                                            <Form 
                                                id='email'
                                                value={this.state.email}
                                                change={e => this.setState({email: e.target.value})}
                                                label='E-mail *'
                                                type='email'
                                                placeholder='Digite aqui o seu e-mail'
                                            />
                                            <Form 
                                                id="password"
                                                value={this.state.senha}
                                                change={e => this.setState({senha: e.target.value})}
                                                label='Senha *'
                                                type='password'
                                                placeholder='Digite aqui o sua senha'
                                            />
                                            <Button 
                                                type='success'
                                                label='Entrar'
                                                click={this.entrar()}
                                            />
                                            <Button 
                                                type='danger'
                                                label='Cadastrar'
                                            />                                       
                                        </div>                                     
                                    </div>
                                </div>
                            </Card> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;