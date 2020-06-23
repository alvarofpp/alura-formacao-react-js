const ApiService = {
    listaAutores: () => {
        return fetch('http://localhost:8000/api/autor');
    },

    criaAutor: (autor) => {
        return fetch('http://localhost:8000/api/autor', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: autor
        });
    },

    listaNomes: () => {
        return fetch('http://localhost:8000/api/autor/nome');
    },

    listaLivros: () => {
        return fetch('http://localhost:8000/api/autor/livro');
    },

    removeAutor: (id) => {
        return fetch(`http://localhost:8000/api/autor/${id}`, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        });
    },

    tratarErros: (res) => {
        if (!res.ok) {
            throw Error(res.responseText);
        }

        return res.json();
    }
};

export default ApiService;