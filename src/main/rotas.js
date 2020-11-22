import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastro-usuario';
import Home from '../views/home';
import ConsultaLancamento from '../views/lancamentos/consulta-lancamento';
import CadastroLancamento from '../views/lancamentos/cadastro-lancamento';

export default function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/home" component={Home} />
                <Route path="/consulta-lancamento" component={ConsultaLancamento} />
                <Route path="/cadastro-lancamento/:id?" component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    );
}