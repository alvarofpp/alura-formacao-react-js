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

        this.setState({
            autores: autores.filter((autor) => {
                return autor.id !== id;
            }),
        });
        PopUp.exibeMensagem("error", "Autor removido com sucesso.");
        ApiService.removeAutor(id);
    }

    escutadorDeSubmit = (autor) => {
        ApiService.criaAutor(JSON.stringify(autor))
            .then((res) => res.data)
            .then((autor) => {
                this.setState({
                    autores: [...this.state.autores, autor]
                });
                PopUp.exibeMensagem("success", "Autor adicionado com sucesso.");
            });
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
            .then((res) => {
                this.setState({
                    autores: [...this.state.autores, ...res.data]
                });
            });
    }
}

export default App;