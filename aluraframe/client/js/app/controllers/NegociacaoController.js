class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacoes = new ListaNegociacoes((model) => this._negociacoesView.update(model));

        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update();
    }

    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adicionar(this._criaNegociacao());
        this._mensagemView.update('Negociação adicionada com sucesso!');

        this._limpaFormulario();
    }

    apaga() {
        this._listaNegociacoes.esvazia();
        this._mensagemView.update('Negociações apagadas com sucesso!');
    }

    _criaNegociacao() {
        return Negociacao.create({
            data: DateHelper.textoParaData(this._inputData.value),
            quantidade: this._inputQuantidade.value,
            valor: this._inputValor.value
        });
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}