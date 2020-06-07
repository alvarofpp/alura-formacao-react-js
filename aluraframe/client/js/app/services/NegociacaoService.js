class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http
            .get('negociacoes/semana')
            .then((negociacoes) => {
                return negociacoes.map((objeto) => Negociacao.create(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                throw new Error('Não foi possível obter as negociações da semana.')
            });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then((negociacoes) => {
                return negociacoes.map((objeto) => Negociacao.create(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                throw new Error('Não foi possível obter as negociações da semana retrasada.')
            });
    }

    obterNegociacoesDaSemanaAnterior() {
        return this._http
            .get('negociacoes/anterior')
            .then((negociacoes) => {
                return negociacoes.map((objeto) => Negociacao.create(new Date(objeto.data), objeto.quantidade, objeto.valor));
            }).catch(erro => {
                throw new Error('Não foi possível obter as negociações da semana anterior.')
            });
    }

    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => periodos.reduce((dados, periodo) => dados.concat(periodo), []))
            .catch(erro => {
                throw new Error(erro);
            });
    }
}