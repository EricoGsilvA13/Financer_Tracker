// Elementos da página
const descricao = document.getElementById("descricao_despesa");
const valor = document.getElementById("valor_despesa");
const data = document.getElementById("data_despesa");
const categoria = document.getElementById("categoria_despesa");
const botao = document.getElementById("button_salvar_despesa");
const lista = document.getElementById("minha_lista_despesa");

// Lê uma lista guardada no navegador (ou devolve lista vazia)
function lerLista(chave) {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch (erro) {
        return [];
    }
}

let despesas = lerLista("despesas");

// "2026-10-05" -> "05/10/2026"
function formatarData(texto) {
    const partes = texto.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// 3500 -> "R$ 3.500,00"
function formatarValor(numero) {
    return numero.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Cria uma célula <td> com um texto
function criarCelula(texto, classe) {
    const td = document.createElement("td");
    td.textContent = texto;
    if (classe) {
        td.className = classe;
    }
    return td;
}

// Coloca as categorias cadastradas dentro do <select>
function preencherCategorias() {
    const categorias = lerLista("categorias");
    categoria.innerHTML = "";

    const primeira = document.createElement("option");
    primeira.value = "";
    primeira.textContent = categorias.length === 0 ? "Cadastre uma categoria antes" : "Selecione...";
    categoria.appendChild(primeira);

    categorias.forEach(function (nome) {
        const opcao = document.createElement("option");
        opcao.value = nome;
        opcao.textContent = nome;
        categoria.appendChild(opcao);
    });
}

// Desenha a tabela a partir da lista de despesas
function mostrarDespesas() {
    lista.innerHTML = "";

    if (despesas.length === 0) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhuma despesa cadastrada");
        td.colSpan = 5;
        tr.appendChild(td);
        lista.appendChild(tr);
        return;
    }

    despesas.forEach(function (despesa, posicao) {
        const tr = document.createElement("tr");

        tr.appendChild(criarCelula(despesa.descricao));
        tr.appendChild(criarCelula(formatarValor(despesa.valor), "negativo"));
        tr.appendChild(criarCelula(formatarData(despesa.data)));
        tr.appendChild(criarCelula(despesa.categoria));

        const tdAcoes = document.createElement("td");
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", function () {
            despesas.splice(posicao, 1);
            localStorage.setItem("despesas", JSON.stringify(despesas));
            mostrarDespesas();
        });
        tdAcoes.appendChild(excluir);
        tr.appendChild(tdAcoes);

        lista.appendChild(tr);
    });
}

// Ao clicar em "Salvar", guarda a despesa e mostra na tabela
botao.addEventListener("click", function () {
    const texto = descricao.value.trim();
    const numero = Number(valor.value);

    if (texto === "" || valor.value === "" || numero <= 0 || data.value === "" || categoria.value === "") {
        alert("Preencha todos os campos. O valor deve ser maior que zero.");
        return;
    }

    despesas.push({
        descricao: texto,
        valor: numero,
        data: data.value,
        categoria: categoria.value
    });
    localStorage.setItem("despesas", JSON.stringify(despesas));
    mostrarDespesas();

    // Limpa o formulário
    descricao.value = "";
    valor.value = "";
    data.value = "";
    categoria.value = "";
    descricao.focus();
});

preencherCategorias();
mostrarDespesas();