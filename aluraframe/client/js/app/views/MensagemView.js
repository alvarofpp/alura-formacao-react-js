class MensagemView extends View {
    template(texto = '') {
        if (texto) {
            return `<p class="alert alert-info">${texto}</p>`;
        }
        return '<p></p>';
    }
}