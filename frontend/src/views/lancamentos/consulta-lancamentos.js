import React, { useState } from 'react';
import Card from '../../components/card';
import Form from '../../components/form';
import SelectMenu from '../../components/selectMenu';
import { Button } from '../../components/button';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageservice from '../../app/service/localStorageService';
import * as messages from '../../components/toastr';

const ConsultaLancamentos = () => {
    const [ano, setAno] = useState();
    const [mes, setMes] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [lancamentos, setLancamentos] = useState([]);

    const lancamentoService = new LancamentoService();

    const consultar = () => {
        if(!ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório');
        }

        const usuarioLogado = LocalStorageservice.obtemItem('usuario_logado');

        const lancamentoFiltro = {
            ano: ano,
            mes: mes,
            tipo: tipo,
            descricao: descricao,
            usuario: usuarioLogado.id
        }

        lancamentoService
            .consultar(lancamentoFiltro)
            .then(resp => {
              setLancamentos(resp.data)  
            }).catch(error => {
                console.log(error);
            })
    }


    const meses = lancamentoService.obterMeses();

    const tipos= lancamentoService.obterTipos();

    const editar = (id) => {
        console.log('edit',id);
    }

    const excluir = (lancamento) => {
        lancamentoService.excluir(lancamento.id)
            .then(resp => {
                const lancamentosidx = lancamentos;
                const index = lancamentosidx.indexOf(lancamento);
                lancamentosidx.splice(index, 1);
                setLancamentos(lancamentosidx);

                messages.mensagemSucesso('Laçamento excluido com sucesso.');
            }).catch(error => {
                messages.mensagemErro('Não foi possivel excluir o lançamento');
            })
    }
    
  return (
    <Card title='Consulta Lançamentos'>
        <div className="row">
            <div className="col-lg-6">
                <div className="bs-component">
                    <Form 
                        id='ano'
                        label='Ano: *'
                        value={ano}
                        change={e => setAno(e.target.value)}
                        placeholder='Digite o ano'
                        type='text'
                    />
                    <SelectMenu 
                        id='mes'
                        label='Mes: '
                        value={mes}
                        change={e => setMes(e.target.value)}
                        lista={meses}
                    />
                    <Form 
                        id='descricao'
                        label='Descricao: '
                        value={descricao}
                        change={e => setDescricao(e.target.value)}
                        placeholder='Digite uma descricao'
                        type='text'
                    />
                    <SelectMenu 
                        id='tipo'
                        label='Tipo: '
                        value={tipo}
                        change={e => setTipo(e.target.value)}
                        lista={tipos}
                    />
                    <Button 
                        type='success'
                        label='Buscar'
                        click={consultar}
                    />
                    <Button 
                        type='danger'
                        label='Cadastra'
                    />
                </div>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-lg-12">
                <LancamentosTable 
                    lancamentos={lancamentos}
                    deleteAction={excluir}
                    editAction={editar}
                />
            </div>
        </div>
    </Card>
  )
}

export default ConsultaLancamentos;