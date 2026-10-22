// Elementos da página
const input = document.getElementById("categorias");
const botao = document.getElementById("button_salvar_categoria");
const lista = document.getElementById("minha_lista_categoria");
 
// Categorias guardadas no navegador (se não houver nenhuma, começa vazia)
const categorias = JSON.parse(localStorage.getItem("categorias")) || [];
 
// Cria um item <li> na lista com o nome da categoria
function mostrarCategoria(nome) {
    const item = document.createElement("li");
    item.textContent = nome;
    lista.appendChild(item);
} 
// Ao abrir a página, mostra as categorias que já estavam salvas
categorias.forEach(mostrarCategoria);

// Ao clicar em "Salvar", adiciona a categoria digitada na lista
botao.addEventListener("click", function () {
    const nome = input.value.trim();
    // Não salva se o campo estiver vazio
    if (nome === "") {
        return;
    }
 
    categorias.push(nome);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    mostrarCategoria(nome);
 
    // Limpa o campo e deixa pronto para a próxima categoria
    input.value = "";
    input.focus();
});
 