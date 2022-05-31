import React,{ useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';

import LancamentoService from '../../app/service/lancamentoService';
import Card from '../../components/card';
import Form from '../../components/form';
import SelectMenu from '../../components/selectMenu';
import * as messages from '../../components/toastr';
import LocalStorageservice from '../../app/service/localStorageService';

const CadastroLancamento = () => {
    const [id, setId] = useState(null);
    const [usuario, setUsuario] = useState();
    const [descricao, setDescricao] = useState();
    const [valor, setValor] = useState();
    const [mes, setMes] = useState();
    const [ano, setAno] = useState();
    const [tipo, setTipo] = useState();
    const [status, setStatus] = useState();
    const [atualizando, setAtualizando] = useState(false);

    const lancamentoService = new LancamentoService();
    const navigate = useNavigate();

    const tipos = lancamentoService.obterTipos();
    const meses = lancamentoService.obterMeses();

    const params = useParams();

    useEffect(() => {
       if(params.id){
            setAtualizando(true);
            
           lancamentoService.obterPorId(params.id)
            .then(resp => {
                setId(resp.data.id);
                setDescricao(resp.data.descricao);
                setValor(resp.data.valor);
                setMes(resp.data.mes);
                setAno(resp.data.ano);
                setTipo(resp.data.tipo);
                setStatus(resp.data.status);
                setUsuario(resp.data.usuario);
            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            });
       } 
    },[]);

    const haldleState =  {
        'id': setId,
        'descricao': setDescricao,
        'valor': setValor,
        'mes': setMes,
        'ano': setAno,
        'tipo': setTipo,
        'status': setStatus
    }

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        haldleState[`${name}`](value);
    }

    const submit = () => {
        const usuarioLogado = LocalStorageservice.obtemItem('usuario_logado');
        setUsuario(usuarioLogado.id);

        const lancamentoState = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario
        }

        console.log(lancamentoState);

        try {
            lancamentoService.validar(lancamentoState);
        } catch (error) {
            const mensagens = error.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }
        lancamentoService
            .salvar(lancamentoState)
            .then(resp => {
                navigate('/consulta-lancamento');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            });
    }

    const atualizar = () => {
        const lancamentoState = {
            id,
            descricao,
            valor,
            mes,
            ano,
            tipo,
            status,
            usuario
        }
        lancamentoService
            .atualizar(lancamentoState)
            .then(resp => {
                navigate('/consulta-lancamento');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!');
            }).catch(erro => {
                messages.mensagemErro(erro.response.data);
            });
    }

    return (
        <>
        <Card title={ atualizando ? 'Atualização de Lançamentos' : 'Cadastro de Lançamentos'}>
            <div className='row'>
                <div className='col-md-12'>
                    <Form 
                        label='Descrição: *'
                        id='descricao'
                        type='text'
                        name='descricao'
                        value={descricao}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <Form 
                        label='Ano: *'
                        id='ano'
                        type='text'
                        name='ano'
                        value={ano}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-md-6'>
                    <SelectMenu 
                        label='Mes: *'
                        id='mes'
                        lista={meses}
                        name='mes'
                        value={mes}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <Form 
                        label='Valor: *'
                        id='valor'
                        type='text'
                        name='valor'
                        value={valor}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-md-4'>
                    <SelectMenu 
                        id='tipo'
                        label='Tipo: '
                        lista={tipos}
                        name='tipo'
                        value={tipo}
                        onChange={handleChange}
                    />
                </div>
                <div className='col-md-4'>
                    <Form 
                        label='Status: *'
                        id='status'
                        type='text'
                        disabled
                        value={status}
                    />
                </div>
            </div>
            {
                atualizando ? (
                    <Button 
                        label='Atualizar'
                        style={{marginTop: 5, marginRight: 5}}
                        className='p-button-secondary'
                        onClick={atualizar}
                        icon='pi pi-refresh'
                    />
                ) : (
                    <Button 
                        label='Salvar'
                        style={{marginTop: 5, marginRight: 5}}
                        className='p-button-success'
                        onClick={submit}
                        icon='pi pi-save'
                    />
                )
            }
            <Button 
                label='Cancelar'
                style={{marginTop: 5, marginRight: 5}}
                className='p-button-danger'
                onClick={e => navigate('/consulta-lancamento')}
                icon='pi pi-times'
            />
        </Card>
        </>
    )
}

export default CadastroLancamento