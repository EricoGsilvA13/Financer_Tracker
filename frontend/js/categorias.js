// Elementos da página
const input = document.getElementById("categorias");
const tipo = document.getElementById("tipo_categoria");
const botao = document.getElementById("button_salvar_categoria");
const lista = document.getElementById("minha_lista_categoria");

// Categorias guardadas no navegador (se não houver nenhuma, começa vazia)
const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

// Desenha a lista a partir das categorias salvas
function mostrarCategorias() {
    lista.innerHTML = "";

    categorias.forEach(function (categoria, posicao) {
        const item = document.createElement("li");
        item.textContent = categoria.nome + " (" + categoria.tipo + ") ";

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", function () {
            categorias.splice(posicao, 1);
            localStorage.setItem("categorias", JSON.stringify(categorias));
            mostrarCategorias();
        });

        item.appendChild(excluir);
        lista.appendChild(item);
    });
}

// Ao abrir a página, mostra as categorias que já estavam salvas
mostrarCategorias();

// Ao clicar em "Salvar", adiciona a categoria digitada na lista
botao.addEventListener("click", function () {
    const nome = input.value.trim();

    // Não salva se o campo estiver vazio
    if (nome === "") {
        return;
    }

    categorias.push({ nome: nome, tipo: tipo.value });
    localStorage.setItem("categorias", JSON.stringify(categorias));
    mostrarCategorias();

    // Limpa o campo e deixa pronto para a próxima categoria
    input.value = "";
    input.focus();
});