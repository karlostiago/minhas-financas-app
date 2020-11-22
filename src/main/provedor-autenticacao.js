import React from 'react';

import AuthService from '../app/service/auth-service';

export const Context = React.createContext();
export const Consumer = Context.Consumer;
const Provider = Context.provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.login(usuario);
        this.setState({isAutenticado: true, usuarioAutenticado: usuario});
    }

    destroirSessao = () => {
        AuthService.logout();
        this.setState({isAutenticado: false, usuarioAutenticado: null});
    }

    render() {
        
        const context = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            destroirSessao: this.destroirSessao
        }

        return (
            <Provider value={context}>
                {this.props.children}
            </Provider>
        );
    }
}

export default ProvedorAutenticacao;