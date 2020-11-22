import ApiService from '../api-service';
import ValidationException from '../exception/validationException';

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }

    salvar(lancamento) {
        return this.post('/', lancamento);
    }   

    validar(lancamento) {
        const errors = [];

        if(!lancamento.ano) {
            errors.push("Informe o ano");
        }
        if(!lancamento.mes) {
            errors.push("Informe o mês");
        }
        if(!lancamento.descricao) {
            errors.push("Informe uma descrição");
        }
        if(!lancamento.valor) {
            errors.push("Informe o valor");
        }
        if(!lancamento.tipo) {
            errors.push("Informe o tipo");
        }
        if(errors && errors.length > 0) {
            throw new ValidationException(errors);
        }
    }

    consultar(lancamentoFiltro) {
        let params = `?ano=${lancamentoFiltro.ano}`;
        
        if(lancamentoFiltro.mes) {
            params += `&mes=${lancamentoFiltro.mes}`;
        }

        if(lancamentoFiltro.tipo) {
            params += `&tipo=${lancamentoFiltro.tipo}`;
        }

        if(lancamentoFiltro.status) {
            params += `&stats=${lancamentoFiltro.status}`;
        }

        if(lancamentoFiltro.usuario) {
            params += `&usuario=${lancamentoFiltro.usuario}`;
        }

        if(lancamentoFiltro.descricao) {
            params += `&descricao=${lancamentoFiltro.descricao}`;
        }
        
        return this.get(params);
    }

    deletar(id) {
        return this.delete(`/${id}`);
    }

    meses() {
        return [
            {label: 'Selecione', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12}
        ];
    }

    tipos() {
        return [
            {label: 'Selecione', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'}    
        ];
    }

    porId(id) {
        return this.get(`/${id}`);
    }

    update(lancamento) {
        return this.put(`/${lancamento.id}`, lancamento);
    }

    updateStatus(id, status) {
        return this.put(`/${id}/atualizaStatus`, { status });
    }
}

export default LancamentoService;