// Elementos da página
const usuarioSelect = document.getElementById("usuario_dashboard");
const periodoSelect = document.getElementById("periodo_dashboard");
const estatisticasReceita = document.getElementById("estatisticas_receita");
const estatisticasDespesa = document.getElementById("estatisticas_despesa");
const rankingReceita = document.getElementById("ranking_receita");
const ranking = document.getElementById("ranking_categoria");

// Categorias carregadas da API (usadas para mostrar o nome)
let todasCategorias = [];

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

// Date -> "2026-10-05" (usa a data local, não a UTC)
function dataParaTexto(dataObj) {
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const dia = String(dataObj.getDate()).padStart(2, "0");
    return ano + "-" + mes + "-" + dia;
}

// Devolve o início e o fim do período escolhido (ou null para "todo o período")
function intervaloDoPeriodo(periodo) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();

    if (periodo === "hoje") {
        return { inicio: dataParaTexto(hoje), fim: dataParaTexto(hoje) };
    }

    if (periodo === "7dias" || periodo === "30dias") {
        const dias = periodo === "7dias" ? 7 : 30;
        // Conta a partir de hoje: hoje e os (dias - 1) dias anteriores
        const inicio = new Date(ano, mes, hoje.getDate() - (dias - 1));
        return { inicio: dataParaTexto(inicio), fim: dataParaTexto(hoje) };
    }

    if (periodo === "mes") {
        return {
            inicio: dataParaTexto(new Date(ano, mes, 1)),
            fim: dataParaTexto(new Date(ano, mes + 1, 0))
        };
    }

    if (periodo === "ano") {
        return {
            inicio: dataParaTexto(new Date(ano, 0, 1)),
            fim: dataParaTexto(new Date(ano, 11, 31))
        };
    }

    return null;
}

// Fica só com os itens do usuário escolhido e que estão dentro do período
function filtrar(lista, usuarioId, intervalo) {
    return lista.filter(function (item) {
        if (item.usuario_id !== usuarioId) {
            return false;
        }

        if (intervalo === null) {
            return true;
        }

        // Datas no formato "AAAA-MM-DD" podem ser comparadas como texto
        return item.data_movimentacao >= intervalo.inicio && item.data_movimentacao <= intervalo.fim;
    });
}

// A receita ou despesa só guarda o id da categoria, então procuramos o nome dela
function nomeDaCategoria(categoriaId) {
    const encontrada = todasCategorias.find(function (item) {
        return item.id === categoriaId;
    });

    return encontrada ? encontrada.nome : "Sem categoria";
}

// Soma os valores por categoria, da que mais tem para a que menos tem
// (funciona tanto para receitas quanto para despesas)
function totaisPorCategoria(lista) {
    const totais = {};

    lista.forEach(function (item) {
        totais[item.categoria_id] = (totais[item.categoria_id] || 0) + Number(item.valor);
    });

    return Object.keys(totais)
        .map(function (id) {
            return { nome: nomeDaCategoria(Number(id)), total: totais[id] };
        })
        .sort(function (a, b) {
            return b.total - a.total;
        });
}

// Escreve os valores nos cards
function atualizarCards(totalReceitas, totalDespesas, movimentacoes) {
    const saldo = totalReceitas - totalDespesas;

    document.getElementById("saldo").textContent = formatarValor(saldo);
    document.getElementById("receitas").textContent = formatarValor(totalReceitas);
    document.getElementById("despesas").textContent = formatarValor(totalDespesas);
    document.getElementById("movimentacoes").textContent = movimentacoes;
}

// Desenha uma lista (<ul> ou <ol>) com "Categoria → R$ valor"
function desenharLista(elemento, itens, mensagemVazia) {
    elemento.innerHTML = "";

    if (itens.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = mensagemVazia;
        elemento.appendChild(vazio);
        return;
    }

    itens.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item.nome + " → " + formatarValor(item.total);
        elemento.appendChild(li);
    });
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

// Busca receitas e despesas na API e atualiza cards, estatísticas, rankings e gráficos
async function carregarDashboard() {
    if (usuarioSelect.value === "") {
        atualizarCards(0, 0, 0);
        desenharLista(estatisticasReceita, [], "Nenhum usuário selecionado");
        desenharLista(estatisticasDespesa, [], "Nenhum usuário selecionado");
        desenharLista(rankingReceita, [], "Nenhum usuário selecionado");
        desenharLista(ranking, [], "Nenhum usuário selecionado");
        atualizarGraficos([], [], [], []);
        return;
    }

    const usuarioId = Number(usuarioSelect.value);
    const intervalo = intervaloDoPeriodo(periodoSelect.value);

    const todasReceitas = await listarReceitas();
    const todasDespesas = await listarDespesas();

    const receitas = filtrar(todasReceitas, usuarioId, intervalo);
    const despesas = filtrar(todasDespesas, usuarioId, intervalo);

    atualizarCards(somar(receitas), somar(despesas), receitas.length + despesas.length);

    const totaisReceitas = totaisPorCategoria(receitas);
    const totaisDespesas = totaisPorCategoria(despesas);

    desenharLista(estatisticasReceita, totaisReceitas, "Nenhuma receita no período");
    desenharLista(estatisticasDespesa, totaisDespesas, "Nenhuma despesa no período");
    desenharLista(rankingReceita, totaisReceitas.slice(0, 5), "Nenhuma receita no período");
    desenharLista(ranking, totaisDespesas.slice(0, 5), "Nenhuma despesa no período");

    // Pizzas e barras usam o período; a evolução do saldo usa todo o histórico do usuário
    atualizarGraficos(
        receitas,
        despesas,
        filtrar(todasReceitas, usuarioId, null),
        filtrar(todasDespesas, usuarioId, null)
    );
}

// Ao trocar o usuário ou o período, atualiza tudo
async function aoMudarFiltro() {
    try {
        await carregarDashboard();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o resumo. Tente novamente.");
    }
}

usuarioSelect.addEventListener("change", aoMudarFiltro);
periodoSelect.addEventListener("change", aoMudarFiltro);

// Ao abrir a página, carrega categorias, usuários e o resumo (nessa ordem)
async function iniciar() {
    try {
        todasCategorias = await listarCategorias();
        await preencherUsuarios();
        await carregarDashboard();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o resumo. Verifique se a API está rodando.");
    }
}

iniciar();