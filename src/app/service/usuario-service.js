import ApiService from '../api-service';
import ValidationException from '../exception/validationException';

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    validar(usuario) {
        const errors = [];

        if(!usuario.nome) {
            errors.push('O campo nome é obrigatório');
        }

        if(!usuario.email ) {
            errors.push('O campo email é obrigatório');
        }

        if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            errors.push('O email informado não é válido.')
        }

        if(!usuario.senha) {
            errors.push('O campo senha é obrigatório.');
        }

        if(!usuario.confirmaSenha) {
            errors.push('O campo confirma senha é obrigatório.');
        }

        if(usuario.senha !== usuario.confirmaSenha) {
            errors.push('As senhas não conferem.');
        }

        if(errors && errors.length > 0) {
            throw new ValidationException(errors);
        }
    }

    autenticar(email, senha) {
        let usuario = {
            email: email,
            senha: senha
        }

        return this.post('/autenticar', usuario);
    }

    salvar(usuario) {
        return this.post('/', usuario);
    }

    saldoPorID(id) {
        return this.get(`/${id}/saldo`);
    }
}

export default UsuarioService;