import React, {Component, Fragment} from "react";
import FormValidator from "../../utils/FormValidator";
import PopUp from "../../utils/PopUp";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toast from "../Toast/Toast";


class Form extends Component {
    constructor(props) {
        super(props);
        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: "Entre com um nome"
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: "Entre com um livro"
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{min: 0, max: 99999}],
                validoQuando: true,
                mensagem: "Entre com um valor númerico"
            },
        ]);

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
            open: true
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
            <Fragment>
                <Toast open={this.state.open}
                       handleClose={() => this.setState({open: false})}>
                    Toast funcionando
                </Toast>
                <form>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <TextField id='nome'
                                       label='Nome'
                                       name='nome'
                                       value={nome}
                                       onChange={this.escutadorDeInput}
                                       variant='outlined'/>
                        </Grid>
                        <Grid item>
                            <TextField id='livro'
                                       label='Livro'
                                       name='livro'
                                       value={livro}
                                       onChange={this.escutadorDeInput}
                                       variant='outlined'/>
                        </Grid>
                        <Grid item>
                            <TextField id='preco'
                                       label='Preço'
                                       name='preco'
                                       value={preco}
                                       onChange={this.escutadorDeInput}
                                       variant='outlined'/>
                        </Grid>
                        <Grid item>
                            <Button onClick={this.submitFormulario}
                                    type='button'
                                    variant='contained'
                                    color='primary'>
                                Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Fragment>
        );
    }
}

export default Form;