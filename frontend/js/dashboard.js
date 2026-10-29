// Lê uma lista guardada no navegador (ou devolve lista vazia)
function lerLista(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch (erro) {
        return [];
    }
}

// 3500 -> "R$ 3.500,00"
function formatarValor(numero) {
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Soma o campo "valor" de todos os itens da lista
function somar(lista) {
    let total = 0;
    lista.forEach(function (item) {
        total += item.valor;
    });
    return total;
}

const receitas = lerLista("receitas");
const despesas = lerLista("despesas");

const totalReceitas = somar(receitas);
const totalDespesas = somar(despesas);
const saldo = totalReceitas - totalDespesas;
const movimentacoes = receitas.length + despesas.length;

// Atualiza os cards
document.getElementById("saldo").textContent = formatarValor(saldo);
document.getElementById("receitas").textContent = formatarValor(totalReceitas);
document.getElementById("despesas").textContent = formatarValor(totalDespesas);
document.getElementById("movimentacoes").textContent = movimentacoes;