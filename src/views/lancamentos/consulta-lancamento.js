import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';
import LancamentoTable from './lancamento-table';
import LancamentoService from '../../app/service/lancamento-serivce';
import UsuarioService from '../../app/service/usuario-service';
import { mensagemDeAlerta, mensagemDeErro, mensagemDeSucesso } from '../../components/toastr';

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

class ConsultaLancamento extends React.Component {

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
        this.lancamentoService = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamento: {},
        lancamentos: []
    }

    buscar = () => {

        if(!this.state.ano) {
            mensagemDeErro('O campo ano não foi informado!');
            return false;
        }

        const usuario = this.usuarioService.usuarioLogado().id;
        const { ano, mes, tipo, descricao } = this.state;
        const lancamentoFiltro = {
            ano,
            mes,
            tipo, 
            descricao,
            usuario
        }

        this.lancamentoService
            .consultar(lancamentoFiltro)
            .then(response => {
                const lancamentos = response.data;
                if(lancamentos.length < 1) {
                    mensagemDeAlerta('Esta consulta não retornou nenhum resultado.')
                }
                this.setState({lancamentos: response.data});
            }).catch(error => {
                mensagemDeErro(error);
            });
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamento/${id}`);
    }

    deletar = () => {
        this.lancamentoService
            .deletar(this.state.lancamento.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamento);
                lancamentos.splice(index, 1);
                this.setState(lancamentos);
                this.cancelaDialog();
                mensagemDeSucesso('Lançamento removido com sucesso.');
            }).catch(error => {
                mensagemDeErro('Ops! Ocorreu um problema ao tentar deletar o lançamento.');
            });
    }

    abrirDialog = (lancamento) => {
        console.log(lancamento);
        this.setState({showConfirmDialog: true, lancamento: lancamento});
    }

    cancelaDialog = () => {
        this.setState({showConfirmDialog: false, lancamento: {}});
    }

    efetivar = (lancamento) => {
        const status = 'EFETIVADO';

        if(lancamento.status === 'CANCELADO') {
            mensagemDeAlerta('Lançamento cancelado não pode ser efetivado.');
            return false;
        }

        this.lancamentoService.updateStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);

            if(index > -1) {
                lancamento['status'] = status;
                lancamentos[index] = lancamento;
                this.setState({lancamento});
            }

            mensagemDeSucesso('Lançamento efetivado com sucesso.');
        })
        .catch(error => {
            mensagemDeErro(error);
        });
    }

    cancelar = (lancamento) => {
        const status = 'CANCELADO';

        if(lancamento.status === 'EFETIVADO') {
            mensagemDeAlerta('Lançamento efetivado não pode ser cancelado.');
            return false;
        }

        this.lancamentoService.updateStatus(lancamento.id, status)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);

            if(index > -1) {
                lancamento['status'] = status;
                lancamentos[index] = lancamento;
                this.setState({lancamento});
            }

            mensagemDeSucesso('Lançamento cancelado com sucesso.');
        })
        .catch(error => {
            mensagemDeErro(error);
        });
    }

    render() {
        const mesesDoAno = this.lancamentoService.meses();
        const tipoDeLancamento = this.lancamentoService.tipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Não" icon="pi pi-times" onClick={this.cancelaDialog} className="p-button-secundary" />
            </div>
        );

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-4">
                        <div className="bs-component">
                            <FormGroup htmlFor="ano" label="Ano.: *">
                                <input type="text" className="form-control" name="ano" id="ano" placeholder="Informe ano"
                                    value={this.state.ano} onChange={(e) => this.setState({ano: e.target.value})}/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bs-component">
                            <FormGroup htmlFor="mes" label="Mês.:">
                                <SelectMenu id="selece-mes"
                                    value={this.state.mes}
                                    onChange={(e) => this.setState({mes: e.target.value})}
                                    className="form-control" 
                                    list={mesesDoAno} />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="bs-component">
                            <FormGroup htmlFor="tipoLancamento" label="Tipo de lançamento.:">
                                <SelectMenu id="select-tipo"
                                    value={this.state.tipo}
                                    onChange={(e) => this.setState({tipo: e.target.value})} 
                                    className="form-control" 
                                    list={tipoDeLancamento} />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup htmlFor="descricao" label="descricao.:">
                                <input type="text" id="descricao" className="form-control" name="descricao"
                                    placeholder="Informe uma descrição" value={this.state.descricao} onChange={(e) => this.setState({descricao: e.target.value})}  />
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={() => this.buscar()}> <em className="pi pi-search" /> Buscar </button>

                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={() => this.props.history.push('/cadastro-lancamento')}
                                style={{position: 'relative', left: '5px'}}> <em className="pi pi-save" /> Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable 
                                lancamentos={this.state.lancamentos} 
                                deletarAction={this.abrirDialog} 
                                editarAction={this.editar}
                                efetivarAction={this.efetivar}
                                cancelarAction={this.cancelar} />    
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Dialog 
                        header="Confirmação de exclusão ?"
                        visible={this.state.showConfirmDialog}
                        style={{width: '50vw'}}
                        modal={true}
                        onHide={() => this.setState({showConfirmDialog: false})}
                        footer={confirmDialogFooter}>
                        
                        Tem certeza que deseja escluir este lançamento.: '{this.state.lancamento.descricao}' ?
                    </Dialog>
                </div>
            </Card>
        );
    }
}

export default withRouter(ConsultaLancamento);