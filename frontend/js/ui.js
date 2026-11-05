// Mostra um aviso (toast) no canto superior direito que some sozinho.
// tipo: "sucesso" (✅, borda verde) ou "erro" (❌, borda vermelha)
function mostrarToast(mensagem, tipo) {
    let container = document.getElementById("toast_container");

    // Cria o container na primeira vez (não precisa de HTML)
    if (!container) {
        container = document.createElement("div");
        container.id = "toast_container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast toast-" + tipo;
    toast.textContent = (tipo === "sucesso" ? "✅ " : "❌ ") + mensagem;

    container.appendChild(toast);

    // Some sozinho depois de 3 segundos (com um pequeno efeito de saída)
    setTimeout(function () {
        toast.classList.add("toast-saindo");
    }, 2700);

    setTimeout(function () {
        toast.remove();
    }, 3000);
}

// Cria o botão "Excluir" com confirmação no próprio lugar.
// Ao clicar, ele dá lugar a "Tem certeza?" com os botões [Cancelar] e [Excluir].
// A função aoConfirmar só roda se a pessoa clicar no segundo "Excluir".
function criarBotaoExcluir(aoConfirmar, texto = "Tem certeza?") {
    const area = document.createElement("span");

    // Estado 1: só o botão "Excluir"
    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";

    // Estado 2: pergunta + [Cancelar] [Excluir]
    const confirmacao = document.createElement("span");
    confirmacao.style.display = "none";

    const pergunta = document.createElement("span");
    pergunta.textContent = texto + " ";

    const cancelar = document.createElement("button");
    cancelar.textContent = "Cancelar";

    const confirmar = document.createElement("button");
    confirmar.textContent = "Excluir";

    // Alterna entre o estado 1 e o estado 2
    function mostrarConfirmacao(mostrar) {
        excluir.style.display = mostrar ? "none" : "";
        confirmacao.style.display = mostrar ? "" : "none";
    }

    excluir.addEventListener("click", function () {
        mostrarConfirmacao(true);
    });

    cancelar.addEventListener("click", function () {
        mostrarConfirmacao(false);
    });

    confirmar.addEventListener("click", async function () {
        // Desativa os botões para não excluir duas vezes com cliques repetidos
        cancelar.disabled = true;
        confirmar.disabled = true;

        try {
            await aoConfirmar();
        } finally {
            // Se a exclusão falhou, volta ao estado inicial
            cancelar.disabled = false;
            confirmar.disabled = false;
            mostrarConfirmacao(false);
        }
    });

    confirmacao.append(pergunta, cancelar, " ", confirmar);
    area.append(excluir, confirmacao);

    return area;
}