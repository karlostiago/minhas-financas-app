import React from 'react';
import NavBarItem from './navbar-item';
import AuthService from '../app/service/auth-service';

export default function NavBar() {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand" >Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="navbar-collapse" className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="#/home" label="Home" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="#/cadastro-usuario" label="Usuários" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="#/consulta-lancamento" label="Lançamentos" />
                        <NavBarItem render={AuthService.isUsuarioAutenticado()} href="#/login" label="Logout" onClick={() => AuthService.logout()} />
                    </ul>
                </div>
            </div>
        </div>
    );
}