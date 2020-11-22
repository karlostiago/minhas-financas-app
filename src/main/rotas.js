import React from 'react';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastro-usuario';
import Home from '../views/home';
import ConsultaLancamento from '../views/lancamentos/consulta-lancamento';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento';
import AuthService from '../app/service/auth-service';

function RotaAutenticada( { component: Component, ...props } ) {
    return (
        <Route {...props} render={(componentProps) => {
            if(AuthService.isUsuarioAutenticado()) {
                return (
                    <Component {...componentProps} />
                );
            }
            else {
                return (
                    <Redirect to={ {pathname: '/login', state: {from: componentProps.location} } } />
                );
            }
        }} />
    );
}

export default function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/consulta-lancamento" component={ConsultaLancamento} />
                <RotaAutenticada path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    );
}