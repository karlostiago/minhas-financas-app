import UsuarioService from '../service/usuario-service';

const usuarioService = new UsuarioService();
const _USUARIO_LOGADO = "USUARIO_LOGADO";

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = usuarioService.usuarioLogado();
        return usuario && usuario.id;
    }

    static logout() {
        localStorage.removeItem(_USUARIO_LOGADO);
    }
}