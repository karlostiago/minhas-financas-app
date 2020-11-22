import React from 'react';
import NavBarItem from './navbar-item';
import { AuthConsumer } from '../main/provedor-autenticacao';

function NavBar(props) {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand" >Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbar-collapse" className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuario" label="Usuários" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamento" label="Lançamentos" />
                        <NavBarItem render={props.isUsuarioAutenticado} href="#/login" label="Sair" onClick={props.logout} />
                    </ul>
                </div>
            </div>
        </div>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        {
            (context) => (<NavBar isUsuarioAutenticado={context.isAutenticado} logout={context.destroirSessao} />)
        }
    </AuthConsumer>
);