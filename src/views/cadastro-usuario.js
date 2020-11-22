import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuario-service';
import {mensagemDeSucesso, mensagemDeErro} from '../components/toastr';

const _LOGIN = 'login';
const _HOME = 'home';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    onClickSalvar = () => {
        const {nome, email, senha, confirmaSenha} = this.state;
        
        const usuario = {
            nome,
            email,
            senha,
            confirmaSenha
        }

        try {
            this.usuarioService.validar(usuario);
            this.usuarioService.salvar(usuario)
            .then(response => {
                mensagemDeSucesso('Usuário cadastrado com sucesso.');
                this.redirecionar();
            }).catch(error => {
                mensagemDeErro(error.response.data);
            });
        }
        catch(error) {
            const errors = error.messages;
            errors.forEach(message => {
                mensagemDeErro(message);
            });
        }
    }

    redirecionar() {
        const from = this.props.location.search.substring(6);

        switch(from) {
            case _LOGIN:
                this.props.history.push('/login');
                break;
            case _HOME:
                this.props.history.push('/home');
                break;
            default:
                break;
        }
    }

    onClickCancelar = () => {
        this.redirecionar();
    }

    render() { 
        return (
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome.: *" htmlFor="nome">
                                <input type="text" id="nome" name="nome" className="form-control"
                                    onChange={e => this.setState({nome: e.target.value})} autoFocus />
                            </FormGroup>
                            <FormGroup label="E-mail.: *" htmlFor="email">
                                <input type="email" id="email" name="email" className="form-control"
                                    onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha.: *" htmlFor="senha">
                                <input type="password" id="senha" name="senha" className="form-control"
                                    onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="confirmaSenha" htmlFor="confirmaSenha">
                                <input type="password" id="confirmaSenha" name="confirmaSenha" className="form-control"
                                    onChange={e => this.setState({confirmaSenha: e.target.value})} />
                            </FormGroup>
                            <div>
                                <button 
                                    type="button" 
                                    className="btn btn-success"
                                    onClick={() => this.onClickSalvar()}
                                    >
                                    <em className="pi pi-save" /> Salvar
                                </button>

                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    style={{position: 'relative', left: '5px'}}
                                    onClick={() => this.onClickCancelar()}> <em className="pi pi-times" /> Cancelar </button>
                            </div>
                        </div>
                    </div>
                </div>   
            </Card>
        );        
    }
}

export default CadastroUsuario;