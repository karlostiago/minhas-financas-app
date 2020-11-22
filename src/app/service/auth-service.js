const _USUARIO_LOGADO = "USUARIO_LOGADO";

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = this.usuarioLogado();
        return usuario && usuario.id;
    }

    static login(usuario) {
        localStorage.setItem(_USUARIO_LOGADO, usuario);
    }

    static logout() {
        localStorage.removeItem(_USUARIO_LOGADO);
    }

    static usuarioLogado() {
        return JSON.parse(localStorage.getItem(_USUARIO_LOGADO)); 
    }
}