import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/card';
import Form from '../../components/form';
import SelectMenu from '../../components/selectMenu';
import { Button } from 'primereact/button';
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
    const [lancamentoExcluir, setLancamentoExcluir] = useState({});
    const [display, setDisplay] = useState(false);

    const navigate = useNavigate();

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
                const lista = resp.data; 
                if (lista.length < 1) {
                    messages.mensagemAlerta('Nenhum resultado encontrado');
                }
              setLancamentos(lista)  
            }).catch(error => {
                console.log(error);
            })
    }

    const meses = lancamentoService.obterMeses();

    const tipos= lancamentoService.obterTipos();

    const editar = (id) => {
        navigate(`/cadastro-lancamento/${id}`);
    }

    const excluir = () => {
        lancamentoService.excluir(lancamentoExcluir.id)
            .then(resp => {
                const lancamentosidx = lancamentos;
                const index = lancamentosidx.indexOf(lancamentoExcluir);
                lancamentosidx.splice(index, 1);
                setLancamentos(lancamentosidx);

                consultar();

                messages.mensagemSucesso('Laçamento excluido com sucesso.');
            }).catch(error => {
                messages.mensagemErro('Não foi possivel excluir o lançamento');
            });
            setDisplay(false);
    }


    const confirmeExclusao = (lancamento) => {
        setDisplay(true);
        setLancamentoExcluir(lancamento);
    }

    const cancelaExclusao = () => {
        setDisplay(false);
        setLancamentoExcluir({});
    }

    const renderFooter = (name) => {
        return(
            <div>
                <Button label="Não" icon="pi pi-times" onClick={cancelaExclusao} className="p-button-text" />
                <Button label="Sim" icon="pi pi-check" onClick={excluir} autoFocus />
            </div>
        );
    }

    const preparaFormularioCadastro = () => {
        navigate('/cadastro-lancamento');
    }

    const alterarStatus = (lancamento, status) => {
        lancamentoService.alterarStatus(lancamento.id, status)
            .then(resp => {
                const lancamentosAtualizado = lancamentos;
                const index = lancamentosAtualizado.indexOf(lancamento);
                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentosAtualizado[index] = lancamento;
                    setLancamentos(lancamentosAtualizado);
                }

                consultar();

                messages.mensagemSucesso('Status atualizado com sucesso');
            });
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
                        onChange={e => setAno(e.target.value)}
                        placeholder='Digite o ano'
                        type='text'
                    />
                    <SelectMenu 
                        id='mes'
                        label='Mes: '
                        value={mes}
                        onChange={e => setMes(e.target.value)}
                        lista={meses}
                    />
                    <Form 
                        id='descricao'
                        label='Descricao: '
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder='Digite uma descricao'
                        type='text'
                    />
                    <SelectMenu 
                        id='tipo'
                        label='Tipo: '
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        lista={tipos}
                    />
                    <Button 
                        label=' Buscar'
                        onClick={consultar}
                        style={{marginTop: 5, marginRight: 5}}
                        className='p-button-success'
                        icon='pi pi-search'
                    />
                    <Button 
                        label=' Cadastra'
                        style={{marginTop: 5, marginRight: 5}}
                        className='p-button-danger'
                        onClick={preparaFormularioCadastro}
                        icon='pi pi-plus'
                    />
                </div>
            </div>
        </div>
        <br/>
        <div className="row">
            <div className="col-lg-12">
                <LancamentosTable 
                    lancamentos={lancamentos}
                    deleteAction={confirmeExclusao}
                    editAction={editar}
                    alterarStatus={alterarStatus}
                />
            </div>
        </div>
        <div>
            <Dialog 
                header="Atençao" 
                visible={display} 
                style={{ width: '25vw' }} 
                footer={renderFooter('display')} 
                onHide={() => setDisplay(false)}>
                <p>Confirma a exclusão deste lançamento?</p>
            </Dialog>
        </div>
    </Card>
  )
}

export default ConsultaLancamentos;