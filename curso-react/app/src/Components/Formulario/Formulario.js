import React, {Component} from "react";
import FormValidator from "../../utils/FormValidator";
import PopUp from "../../utils/PopUp";


class Form extends Component {
    constructor(props) {
        super(props);
        this.validador = new FormValidator([
            {
                campo:'nome',
                metodo:'isEmpty',
                validoQuando: false,
                mensagem: "Entre com um nome"
            },
            {
                campo:'livro',
                metodo:'isEmpty',
                validoQuando: false,
                mensagem: "Entre com um livro"
            },
            {
                campo:'preco',
                metodo:'isInt',
                args: [{min: 0, max: 99999}],
                validoQuando: true,
                mensagem: "Entre com um valor númerico"
            },
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido()
        };
        this.state = this.stateInicial;
    }

    escutadorDeInput = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        });
    };

    submitFormulario = () => {
        const validacao = this.validador.valida(this.state);

        if (validacao.isValid) {
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        } else {
            const {nome, livro, preco} = validacao;
            const campos = [nome, livro, preco];
            const camposInvalidos = campos.filter((elemento) => {
                return elemento.isInvalid;
            });
            camposInvalidos.forEach((campo) => {
                PopUp.exibeMensagem("error", campo.message);
            });
        }
    };

    render() {
        const {nome, livro, preco} = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label htmlFor="nome" className="input-field">Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="livro" className="input-field">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label htmlFor="preco" className="input-field">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.escutadorDeInput}
                        />
                    </div>
                    <div className="input-field col s4">
                        <button onClick={this.submitFormulario} type="button"
                                className="waves-effect waves-light indigo lighten-2 btn">Salvar
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;