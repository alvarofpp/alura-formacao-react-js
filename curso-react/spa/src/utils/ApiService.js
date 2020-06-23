const ApiService = {
    listaAutores: () => {
        return fetch('http://localhost:8000/api/autor')
            .then((res) => ApiService.tratarErros(res))
            .then((res) => res.json());
    },

    criaAutor: (autor) => {
        return fetch('http://localhost:8000/api/autor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: autor
        }).then((res) => ApiService.tratarErros(res))
            .then((res) => res.json());
    },

    listaNomes: () => {
        return fetch('http://localhost:8000/api/autor/nome')
            .then((res) => ApiService.tratarErros(res))
            .then((res) => res.json());
    },

    listaLivros: () => {
        return fetch('http://localhost:8000/api/autor/livro')
            .then((res) => ApiService.tratarErros(res))
            .then((res) => res.json());
    },

    removeAutor: (id) => {
        return fetch(`http://localhost:8000/api/autor/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        }).then((res) => ApiService.tratarErros(res))
            .then((res) => res.json());
    },

    tratarErros: (res) => {
        if (!res.ok) {
            throw Error(res.responseText);
        }

        return res;
    }
};

export default ApiService;