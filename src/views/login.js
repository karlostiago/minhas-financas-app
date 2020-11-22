import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuario-service';
import { mensagemDeErro } from '../components/toastr';

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    onClickEntrar = () => {
        this.usuarioService.autenticar(
            this.state.email, this.state.senha
        ).then(response => {
            localStorage.setItem('USUARIO_LOGADO', JSON.stringify(response.data));
            this.props.history.push('home');
        }).catch(error => {
            mensagemDeErro(error.response.data)
        });
    }

    render() {
        return ( 
            <div className="row">
                <div className="col-md-6" style={ {postion: 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <span>{this.state.mensagem}</span>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email.: *" htmlFor="email">
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="email" 
                                                    aria-describedby="emailHelp"
                                                    placeholder="Email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})} />
                                            </FormGroup>

                                            <FormGroup label="Senha.: *" htmlFor="senha">
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    id="senha" 
                                                    aria-describedby="senhaHelp"
                                                    placeholder="Senha" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}/>
                                            </FormGroup>
                                            <button className="btn btn-success" onClick={() => this.onClickEntrar()}>Entrar</button>
                                            <a href="#/cadastro-usuario?from=login" className="btn btn-danger" style={{position: 'relative', left: '5px'}}>Cadastrar</a>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;