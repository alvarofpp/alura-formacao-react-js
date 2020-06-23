const ApiService = {
    listaAutores: () => {
        return fetch('http://localhost:8000/api/autor')
            .then(res => res.json());
    },

    criaAutor: (autor) => {
        return fetch('http://localhost:8000/api/autor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: autor
        }).then(res => res.json());
    },

    listaNomes: () => {
        return fetch('http://localhost:8000/api/autor/nome')
            .then(res => res.json());
    },

    listaLivros: () => {
        return fetch('http://localhost:8000/api/autor/livro')
            .then(res => res.json());
    },

    removeAutor: (id) => {
        return fetch(`http://localhost:8000/api/autor/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        }).then(res => res.json());
    }
};

export default ApiService;