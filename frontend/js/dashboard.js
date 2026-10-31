// Elemento da página
const usuarioSelect = document.getElementById("usuario_dashboard");

// 3500 -> "R$ 3.500,00"
function formatarValor(numero) {
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Soma o campo "valor" de todos os itens da lista
function somar(lista) {
    let total = 0;
    lista.forEach(function (item) {
        total += Number(item.valor);
    });
    return total;
}

// Escreve os valores nos cards
function atualizarCards(totalReceitas, totalDespesas, movimentacoes) {
    const saldo = totalReceitas - totalDespesas;

    document.getElementById("saldo").textContent = formatarValor(saldo);
    document.getElementById("receitas").textContent = formatarValor(totalReceitas);
    document.getElementById("despesas").textContent = formatarValor(totalDespesas);
    document.getElementById("movimentacoes").textContent = movimentacoes;
}

// Busca os usuários na API e preenche o <select>
async function preencherUsuarios() {
    const usuarios = await listarUsuarios();

    usuarioSelect.innerHTML = "";

    if (usuarios.length === 0) {
        const vazia = document.createElement("option");
        vazia.value = "";
        vazia.textContent = "Nenhum usuário cadastrado";
        usuarioSelect.appendChild(vazia);
        return;
    }

    // O primeiro usuário da lista já vem selecionado
    usuarios.forEach(function (item) {
        const opcao = document.createElement("option");
        opcao.value = item.id;
        opcao.textContent = item.nome;
        usuarioSelect.appendChild(opcao);
    });
}

// Busca receitas e despesas na API e atualiza os cards só com as do usuário escolhido
async function carregarDashboard() {
    if (usuarioSelect.value === "") {
        atualizarCards(0, 0, 0);
        return;
    }

    const usuarioId = Number(usuarioSelect.value);
    const todasReceitas = await listarReceitas();
    const todasDespesas = await listarDespesas();

    const receitas = todasReceitas.filter(function (receita) {
        return receita.usuario_id === usuarioId;
    });

    const despesas = todasDespesas.filter(function (despesa) {
        return despesa.usuario_id === usuarioId;
    });

    atualizarCards(somar(receitas), somar(despesas), receitas.length + despesas.length);
}

// Ao trocar o usuário, atualiza os cards
usuarioSelect.addEventListener("change", async function () {
    try {
        await carregarDashboard();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o resumo. Tente novamente.");
    }
});

// Ao abrir a página, carrega os usuários e o resumo (nessa ordem)
async function iniciar() {
    try {
        await preencherUsuarios();
        await carregarDashboard();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o resumo. Verifique se a API está rodando.");
    }
}

iniciar();