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
async function listarUsuarios() {
    const response = await fetch(
        `${API_URL}/usuarios`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    return await response.json();
}

async function listarReceitas() {
    const response = await fetch(
        `${API_URL}/receitas`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar receitas");
    }

    return await response.json();
}

async function criarReceita(descricao, valor, categoriaId, dataMovimentacao, usuarioId) {
    const response = await fetch(
        `${API_URL}/receitas`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descricao: descricao,
                valor: valor,
                categoria_id: categoriaId,
                data_movimentacao: dataMovimentacao,
                usuario_id: usuarioId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao criar receita");
    }

    return await response.json();
}

async function excluirReceita(id) {
    const response = await fetch(
        `${API_URL}/receitas/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir receita");
    }

    return await response.json();
}