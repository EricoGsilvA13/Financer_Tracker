// Elementos da página
const descricao = document.getElementById("descricao_receita");
const valor = document.getElementById("valor_receita");
const data = document.getElementById("data_receita");
const categoria = document.getElementById("categoria_receita");
const botao = document.getElementById("button_salvar_receita");
const lista = document.getElementById("minha_lista_receita");

// Dados carregados da API
let todasCategorias = [];
let usuario = null;

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

// A receita só guarda o id da categoria, então procuramos o nome dela
function nomeDaCategoria(categoriaId) {
    const encontrada = todasCategorias.find(function (item) {
        return item.id === categoriaId;
    });

    return encontrada ? encontrada.nome : "Sem categoria";
}

// Busca as categorias na API e preenche o <select> só com as de tipo "receita"
async function preencherCategorias() {
    todasCategorias = await listarCategorias();

    const categoriasReceita = todasCategorias.filter(function (item) {
        return item.tipo === "receita";
    });

    categoria.innerHTML = "";

    const primeira = document.createElement("option");
    primeira.value = "";
    primeira.textContent = categoriasReceita.length === 0 ? "Cadastre uma categoria antes" : "Selecione...";
    categoria.appendChild(primeira);

    categoriasReceita.forEach(function (item) {
        const opcao = document.createElement("option");
        opcao.value = item.id;
        opcao.textContent = item.nome;
        categoria.appendChild(opcao);
    });
}

// Busca os usuários na API e usa o primeiro da lista
async function carregarUsuario() {
    const usuarios = await listarUsuarios();
    usuario = usuarios.length > 0 ? usuarios[0] : null;
}

// Busca as receitas na API e desenha a tabela
async function carregarReceitas() {
    const receitas = await listarReceitas();

    lista.innerHTML = "";

    if (receitas.length === 0) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhuma receita cadastrada");
        td.colSpan = 5;
        tr.appendChild(td);
        lista.appendChild(tr);
        return;
    }

    receitas.forEach(function (receita) {
        const tr = document.createElement("tr");

        tr.appendChild(criarCelula(receita.descricao));
        tr.appendChild(criarCelula(formatarValor(Number(receita.valor)), "positivo"));
        tr.appendChild(criarCelula(formatarData(receita.data_movimentacao)));
        tr.appendChild(criarCelula(nomeDaCategoria(receita.categoria_id)));

        const tdAcoes = document.createElement("td");
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", async function () {
            try {
                await excluirReceita(receita.id);
                await carregarReceitas();
            } catch (erro) {
                console.error(erro);
                alert("Não foi possível excluir a receita. Tente novamente.");
            }
        });
        tdAcoes.appendChild(excluir);
        tr.appendChild(tdAcoes);

        lista.appendChild(tr);
    });
}

// Ao clicar em "Salvar", cria a receita na API e atualiza a tabela
botao.addEventListener("click", async function () {
    if (usuario === null) {
        alert("Nenhum usuário cadastrado. Cadastre um usuário antes de salvar receitas.");
        return;
    }

    const texto = descricao.value.trim();
    const numero = Number(valor.value);

    if (texto === "" || valor.value === "" || numero <= 0 || data.value === "" || categoria.value === "") {
        alert("Preencha todos os campos. O valor deve ser maior que zero.");
        return;
    }

    try {
        await criarReceita(
            texto,
            numero,
            Number(categoria.value),
            data.value,
            usuario.id
        );
        await carregarReceitas();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar a receita. Tente novamente.");
        return;
    }

    // Limpa o formulário
    descricao.value = "";
    valor.value = "";
    data.value = "";
    categoria.value = "";
    descricao.focus();
});

// Ao abrir a página, carrega categorias, usuário e receitas (nessa ordem)
async function iniciar() {
    try {
        await preencherCategorias();
        await carregarUsuario();
        await carregarReceitas();
    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os dados. Verifique se a API está rodando.");
    }
}

iniciar();