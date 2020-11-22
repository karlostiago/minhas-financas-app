import React from 'react';

function mesPorExtenso(mes) {
    let descricao = '';
    
    const meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
    
    meses.forEach((mesCorrent, index) => {
        if((index + 1) === mes) {
            descricao = mesCorrent;
        }
    });

    return descricao;
}

function moeda(valor) {
    return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
}

export default function LancamentoTable(props) {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao.toUpperCase()}</td>
                <td>{moeda(lancamento.valor)}</td>
                <td>{lancamento.tipo}</td>
                <td>{mesPorExtenso(lancamento.mes)}</td>
                <td>{lancamento.status}</td>
                <td className="text-center">
                    <button 
                        type="button"
                        className="btn btn-sm btn-success"
                        onClick={e => props.efetivarAction(lancamento)}>
                        <em className="pi pi-check" /> 
                    </button>
                </td>
                <td className="text-center">
                    <button 
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={e => props.cancelarAction(lancamento)}>
                        <em className="pi pi-times" /> 
                    </button>
                </td>
                <td>
                    <button type="button" className="btn btn-sm btn-primary" onClick={e => props.editarAction(lancamento.id)}>
                        <em className="pi pi-pencil" /> Editar
                    </button>
                    <button type="button" className="btn btn-sm btn-danger" style={{position: 'relative', left: '5px'}}
                         onClick={e => props.deletarAction(lancamento)} >
                        <em className="pi pi-trash" /> Remover
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Mês</th>
                    <th>Situação</th>
                    <th>Efetivar</th>
                    <th>Cancelar</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>    
        </table>
    );
}