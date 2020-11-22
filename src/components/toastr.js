import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function mostrar(titulo, mensagem, tipo) {
    toastr[tipo](mensagem, titulo)
}

export function mensagemDeErro(mensagem) {
    mostrar('Erro', mensagem, 'error');
}

export function mensagemDeSucesso(mensagem) {
    mostrar('Sucesso', mensagem, 'success');
}

export function mensagemDeAlerta(mensagem) {
    mostrar('Alerta', mensagem, 'warning');
}

