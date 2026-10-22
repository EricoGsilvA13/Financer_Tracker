// Elementos da página
const input = document.getElementById("categorias");
const botao = document.getElementById("button_salvar_categoria");
const lista = document.getElementById("minha_lista_categoria");
 
// Ao clicar em "Salvar", adiciona a categoria digitada na lista
botao.addEventListener("click", function () {
    const nome = input.value.trim();
 
    // Não salva se o campo estiver vazio
    if (nome === "") {
        return;
    }
 
    const item = document.createElement("li");
    item.textContent = nome;
    lista.appendChild(item);
 
    // Limpa o campo e deixa pronto para a próxima categoria
    input.value = "";
    input.focus();
});
 