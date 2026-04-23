import { redirect } from "react-router-dom";

export async function artigosLoader() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/posts/me/posts", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

    
        if (response.status === 401) {
            localStorage.removeItem("token");
            throw redirect("/login");
        }
        
        const artigos = await response.json();

        console.log("Resposta do servidor:", artigos);
        
        if (!response.ok) {
            throw new Error(artigos.message || "Erro ao carregar artigos");
        }

        return artigos;

    } catch (error) {
        console.error("Erro no loader de artigos:", error);
        throw error;
    }
}