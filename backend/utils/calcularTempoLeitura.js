exports.calcularTempoLeitura = (conteudo) => {
    const textoLimpo = conteudo.replace(/<[^>]*>?/gm, '');
    const palavras = textoLimpo.trim().split(/\s+/).length;
    const tempo = Math.max(1, Math.ceil(palavras / 200));
    return tempo;
}