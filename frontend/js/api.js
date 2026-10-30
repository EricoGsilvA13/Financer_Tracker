const API_URL = "http://localhost:8000";

async function listarCategorias() {
    const response = await fetch(
        `${API_URL}/categorias`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar categorias");
    }

    return await response.json();
}

async function criarCategoria(nome, tipo) {

    const response = await fetch(
        `${API_URL}/categorias`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                tipo: tipo
            })
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao criar categoria");
    }

    return await response.json();
}

async function excluirCategoria(id) {
    const response = await fetch(
        `${API_URL}/categorias/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir categoria");
    }

    return await response.json();
}