import validador from "validator/es";

class FormValidator {
    constructor(validacao) {
        this.validacao = validacao;
    }

    valida(state) {
        const campoValor = state[this.validacao.campo.toString()];
        const metodoValidacao = validador[this.validacao.metodo];

        return !metodoValidacao(campoValor, [], state);
    }
}

export default FormValidator;