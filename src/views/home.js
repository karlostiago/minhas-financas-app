import React from 'react';
import UsuarioService from '../app/service/usuario-service';
import { AuthContext } from '../main/provedor-autenticacao';
import AuthService from '../app/service/auth-service';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        let usuario = this.context.usuarioAutenticado;
        usuario = AuthService.JSONParse(usuario);

        this.usuarioService.saldoPorID(usuario.id)
        .then(response => {
            let valor = response.data.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
            this.setState({saldo: valor});
        }).catch(error => {
            console.error(error.response);
        })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem-vindo!</h1>
                <p className="lead">
                    Esse é seu sistema de finanças. <br/>
                    Seu saldo atual para o mês é de {this.state.saldo}
                </p>
                <hr className="my-4"/>
                <p className="lead">Essa é sua área administrativa, utilize um dos botões abaixo para navegar.<br/>
                    <a href="#/cadastro-usuario?from=home" className="btn btn-primary btn-lg">
                        <i className="pi pi-users"></i> Cadastrar usuário
                    </a>
                    <a href="#/cadastro-lancamento" className="btn btn-primary btn-lg" style={{position: 'relative', left: '5px'}}>
                        <i className="pi pi-money-bill"></i> Cadastrar Lançamentos
                    </a>
                </p>
            </div>
        );
    }
}

Home.contextType = AuthContext;

export default Home;