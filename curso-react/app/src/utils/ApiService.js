const urlBase = 'http://localhost:8000/api';
const consomeApi = (parametro = '/', method = 'GET', body) => {
    return fetch(`${urlBase}${parametro}`, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body,
    }).then((res) => ApiService.tratarErros(res))
        .then((res) => res.json());
};

const ApiService = {
    listaAutores: () => consomeApi('/autor'),
    criaAutor: (autor) => consomeApi('/autor', 'POST', autor),
    listaNomes: () => consomeApi('/autor/nome'),
    listaLivros: () => consomeApi('/autor/livro'),
    removeAutor: (id) => consomeApi(`/autor/${id}`, 'DELETE'),

    tratarErros: (res) => {
        if (!res.ok) {
            throw Error(res.responseText);
        }

        return res;
    }
};

export default ApiService;