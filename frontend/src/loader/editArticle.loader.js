export async function editArticleLoader({ params }) {

  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }

  const [categoriasResponse, artigoResponse] = await Promise.all([
    fetch("http://localhost:8080/categorias"),
    fetch(`http://localhost:8080/posts/me/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  if (categoriasResponse.status === 401 || artigoResponse.status === 401) {
    localStorage.removeItem("token");
    throw redirect("/login");
  }

  if (!categoriasResponse.ok || !artigoResponse.ok) {
    throw new Error("Erro ao carregar dados");
  }

  const categorias = await categoriasResponse.json();
  const artigo = await artigoResponse.json();

  return { categorias, artigo };
}