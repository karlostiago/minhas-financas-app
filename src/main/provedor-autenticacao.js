import React from 'react';

import AuthService from '../app/service/auth-service';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

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
            <AuthProvider value={context}>
                 {this.props.children}
            </AuthProvider>
        );
    }
}

export default ProvedorAutenticacao;