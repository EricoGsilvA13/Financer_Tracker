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

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", async function () {
            await excluirCategoria(categoria.id);
            await carregarCategorias();
        });

        item.appendChild(excluir);
        lista.appendChild(item);
    });
}

// Ao abrir a página, mostra as categorias que já estão na API
carregarCategorias();

// Ao clicar em "Salvar", cria a categoria na API e recarrega a lista
botao.addEventListener("click", async function () {
    const nome = input.value.trim();

    // Não salva se o campo estiver vazio
    if (nome === "") {
        return;
    }

    await criarCategoria(nome, tipo.value);
    await carregarCategorias();

    // Limpa o campo e deixa pronto para a próxima categoria
    input.value = "";
    input.focus();
});