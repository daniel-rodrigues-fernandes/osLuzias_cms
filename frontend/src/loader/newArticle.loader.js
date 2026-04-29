export async function newArticleLoader({ params }) {

    const response = await fetch("http://localhost:8080/categorias");

    if (!response.ok) {
        throw new Error("Erro ao carregar categorias");
    }

    const categorias = await response.json();

    return { categorias, artigo: null };
}