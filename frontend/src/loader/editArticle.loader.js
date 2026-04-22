export async function editArticleLoader({ params }) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8080/posts/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.status === 401) {
    throw redirect("/login");
  }

  if (!response.ok) {
    throw new Response("Erro ao carregar artigo", {
      status: response.status
    });
  }

  return response.json();
}