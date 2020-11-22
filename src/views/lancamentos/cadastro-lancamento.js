import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu';

import LancamentoService from '../../app/service/lancamento-serivce';
import UsuarioService from '../../app/service/usuario-service';
import { mensagemDeSucesso, mensagemDeErro } from '../../components/toastr';

class CadastroLancamento extends React.Component {

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
        this.usuarioService = new UsuarioService();
    }

    state = {
        id: null,
        descricao: '',
        valor: 0,
        mes: '',
        ano: '',
        tipo: null,
        status: null,
        usuario: null,
        update: false
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        this.setState({
            [name]: value
        });
    }

    onClickSalvar = () => {
        const usuario  = this.usuarioService.usuarioLogado().id;
        const  { descricao, valor, mes, ano, tipo, id, status } = this.state;

        const lancamento = {
            id,
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario,
            status
        }

        try {
            this.lancamentoService.validar(lancamento);
            !lancamento.id ? this.salvar(lancamento) : this.atualizar(lancamento); 
        }
        catch(error) {
            const errors = error.messages;
            errors.forEach(message => {
                mensagemDeErro(message);
            });
        }
    }
    
    atualizar(lancamento) {
        this.lancamentoService.update(lancamento)
        .then(response => {
            mensagemDeSucesso('Lançamento atualizado com sucesso.');
            this.props.history.push('/consulta-lancamento');
        })
        .catch(error => {
            mensagemDeErro(error.response.data);
        });
    }

    salvar(lancamento) {
        this.lancamentoService.salvar(lancamento)
        .then(response => {
            mensagemDeSucesso('Lançamento cadastrado com sucesso.');
            this.props.history.push('/consulta-lancamento');
        })
        .catch(error => {
            mensagemDeErro(error.response.data);
        });
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;

        if(id) {
            this.lancamentoService.porId(id)
            .then(response => {
                this.setState({...response.data, update: true});
            })
            .catch(error => {
                mensagemDeErro(error.response.data);
            });
        }
    }

    render() {
        const tipos = this.lancamentoService.tipos();
        const meses = this.lancamentoService.meses();
        
        return (
            <Card title={this.state.update ? 'Atualizando lançamento' : 'Cadastro de lançamento'}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="descricao" label="Descrição.: *">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="descricao" 
                                name="descricao" 
                                autoFocus
                                onChange={this.handleChange}
                                value={this.state.descricao} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="ano" label="Ano.: *">
                            <input 
                                type="number" 
                                min={1} 
                                className="form-control" 
                                id="ano" 
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup htmlFor="mes" label="Mês.:">
                            <SelectMenu 
                                id="mes" 
                                name="mes"
                                list={meses} 
                                className="form-control"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup htmlFor="tipo" label="Tipo.:">
                            <SelectMenu 
                                id="tipo" 
                                name="tipo"
                                list={tipos} 
                                className="form-control"
                                value={this.state.tipo}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="valor" label="Valor.:">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="valor" 
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>    
                    </div>

                    <div className="col-md-4">
                        <FormGroup htmlFor="status" label="Status.:">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="status" 
                                name="status" 
                                disabled 
                                value={this.state.status} />
                        </FormGroup>    
                    </div>
                </div>

                <div className="row">
                    <div className="bs-component">
                        <div className="col-md-12">
                            <button 
                                type="button"
                                className="btn btn-success"
                                onClick={this.onClickSalvar}> <em className={this.state.update ? 'pi pi-refresh' : 'pi pi-save'} /> Salvar</button> 

                            <button 
                                type="button"
                                className="btn btn-danger" 
                                onClick={() => this.props.history.push('/consulta-lancamento')}
                                style={{position: 'relative', left: '5px'}}> <em className="pi pi-times" /> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default withRouter(CadastroLancamento);