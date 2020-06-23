import React, {Component, Fragment} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import Tabela from './Tabela';
import Form from "./Formulario";
import Header from "./Header";
import PopUp from "./PopUp";
import ApiService from "./ApiService";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            autores: []
        };
    }

    removeAutor = (id) => {
        const {autores} = this.state;
        const autoresAtualizado = autores.filter((autor) => {
            return autor.id !== id;
        });
        ApiService.removeAutor(id)
            .then((res) => ApiService.tratarErros(res))
            .then((res) => {
                if (res.message === 'deleted') {
                    this.setState({
                        autores: [...autoresAtualizado]
                    });
                    PopUp.exibeMensagem("error", "Autor removido com sucesso.");
                }
            }).catch((err) => PopUp.exibeMensagem('error', 'Erro na comunicação com a API.'));
    }

    escutadorDeSubmit = (autor) => {
        ApiService.criaAutor(JSON.stringify(autor))
            .then((res) => ApiService.tratarErros(res))
            .then((res) => {
                if (res.message === 'success') {
                    this.setState({
                        autores: [...this.state.autores, autor]
                    });
                    PopUp.exibeMensagem("success", "Autor adicionado com sucesso.");
                }
            }).catch((err) => PopUp.exibeMensagem('error', 'Erro na comunicação com a API.'));
    }

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container mb-10">
                    <h1>Casa do Código</h1>
                    <Tabela autores={this.state.autores} removeAutor={this.removeAutor}/>
                    <Form escutadorDeSubmit={this.escutadorDeSubmit}/>
                </div>
            </Fragment>
        );
    }

    componentDidMount() {
        ApiService.listaAutores()
            .then((res) => ApiService.tratarErros(res))
            .then((res) => {
                if (res.message === 'success') {
                    this.setState({
                        autores: [...this.state.autores, ...res.data]
                    });
                }
            }).catch((err) => PopUp.exibeMensagem('error', 'Erro na comunicação com a API.'));
    }
}

export default App;