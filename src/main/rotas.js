import React from 'react';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastro-usuario';
import Home from '../views/home';
import ConsultaLancamento from '../views/lancamentos/consulta-lancamento';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento';
import { AuthConsumer } from '../main/provedor-autenticacao';

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ) {
    return (
        <Route {...props} render={(componentProps) => {
            if(isUsuarioAutenticado) {
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

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/cadastro-usuario" exact component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} exact path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} exact path="/consulta-lancamento" component={ConsultaLancamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} exact path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    );
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        { 
            (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) 
        }
    </AuthConsumer>
);