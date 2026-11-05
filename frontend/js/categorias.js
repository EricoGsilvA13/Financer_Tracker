// Elementos da página
const input = document.getElementById("categorias");
const tipo = document.getElementById("tipo_categoria");
const botao = document.getElementById("button_salvar_categoria");
const lista = document.getElementById("minha_lista_categoria");

// Busca as categorias na API e desenha a lista
async function carregarCategorias() {
    const categorias = await listarCategorias();

    lista.innerHTML = "";

    categorias.forEach(function (categoria) {
        const item = document.createElement("li");
        item.textContent = categoria.nome + " (" + categoria.tipo + ") ";

        item.appendChild(criarBotaoExcluir(async function () {
            try {
                await excluirCategoria(categoria.id);
                await carregarCategorias();
                mostrarToast("Categoria removida", "sucesso");
            } catch (erro) {
                console.error(erro);
                mostrarToast("Erro ao excluir", "erro");
            }
        }));

        lista.appendChild(item);
    });
}

// Ao abrir a página, mostra as categorias que já estão na API
async function iniciar() {
    try {
        await carregarCategorias();
    } catch (erro) {
        console.error(erro);
        mostrarToast("Erro ao carregar os dados", "erro");
    }
}

iniciar();

// Ao clicar em "Salvar", cria a categoria na API e recarrega a lista
botao.addEventListener("click", async function () {
    const nome = input.value.trim();

    // Não salva se o campo estiver vazio
    if (nome === "") {
        return;
    }

    try {
        await criarCategoria(nome, tipo.value);
        await carregarCategorias();
        mostrarToast("Categoria cadastrada", "sucesso");
    } catch (erro) {
        console.error(erro);
        mostrarToast("Erro ao salvar", "erro");
        return;
    }

    // Limpa o campo e deixa pronto para a próxima categoria
    input.value = "";
    input.focus();
});