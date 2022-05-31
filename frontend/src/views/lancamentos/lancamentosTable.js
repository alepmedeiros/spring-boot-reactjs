import React from 'react'
import currencyFormatter from 'currency-formatter';
import { Button } from 'primereact/button';

const LancamentosTable = (props) => {
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <Button 
                        title='Efetivar'
                        disabled={lancamento.status !== 'PENDENTE'}
                        className='p-button-success'
                        icon='pi pi-check'
                        style={{marginTop: 5, marginRight: 5}}
                        onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                    />
                    <Button 
                        title='Cancelar'
                        disabled={lancamento.status !== 'PENDENTE'}
                        className='p-button-secondary'
                        icon='pi pi-ban'
                        style={{marginTop: 5, marginRight: 5}}
                        onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                    />
                    <Button 
                        title='Editar'
                        icon='pi pi-pencil'
                        style={{marginTop: 5, marginRight: 5}}
                        onClick={e => props.editAction(lancamento.id)}
                    />  
                    <Button 
                        title='Excluir'
                        className="p-button-danger"
                        style={{marginTop: 5, marginRight: 5}}
                        icon='pi pi-trash'
                        onClick={e => props.deleteAction(lancamento)}
                    />
                </td>
            </tr>
        )
    });

    return (
        <div className="bs-component">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Descrição</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Mês</th>
                        <th scope="col">Situação</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default LancamentosTable;