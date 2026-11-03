// Cores usadas nas fatias das pizzas (se houver mais categorias, as cores se repetem)
const CORES_GRAFICO = [
    "#38bdf8", "#34d399", "#f87171", "#fbbf24", "#a78bfa",
    "#fb923c", "#2dd4bf", "#f472b6", "#94a3b8", "#a3e635"
];

// Nomes abreviados dos meses (eixo do gráfico de evolução)
const MESES_ABREVIADOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// Cria o gráfico no <canvas>; se já existir um gráfico ali, destrói antes
function criarGrafico(idCanvas, configuracao) {
    const canvas = document.getElementById(idCanvas);
    const existente = Chart.getChart(canvas);

    if (existente) {
        existente.destroy();
    }

    new Chart(canvas, configuracao);
}

// Formata os números do eixo Y como "R$ 1.000,00"
function formatarEixoValor(valor) {
    return formatarValor(Number(valor));
}

// Gráfico de pizza: um pedaço por categoria
function desenharPizza(idCanvas, totais) {
    criarGrafico(idCanvas, {
        type: "pie",
        data: {
            labels: totais.map(function (item) {
                return item.nome;
            }),
            datasets: [{
                data: totais.map(function (item) {
                    return item.total;
                }),
                backgroundColor: totais.map(function (item, posicao) {
                    return CORES_GRAFICO[posicao % CORES_GRAFICO.length];
                })
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (contexto) {
                            return contexto.label + ": " + formatarValor(contexto.parsed);
                        }
                    }
                }
            }
        }
    });
}

// Gráfico de barras: total de receitas × total de despesas
function desenharBarras(totalReceitas, totalDespesas) {
    criarGrafico("grafico_comparacao", {
        type: "bar",
        data: {
            labels: ["Receitas", "Despesas"],
            datasets: [{
                data: [totalReceitas, totalDespesas],
                backgroundColor: ["#34d399", "#f87171"]
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function (contexto) {
                            return formatarValor(contexto.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: formatarEixoValor }
                }
            }
        }
    });
}

// Saldo acumulado no fim de cada um dos últimos 12 meses (o último ponto vai até hoje)
function saldoAcumuladoUltimos12Meses(receitas, despesas) {
    const hoje = new Date();
    const rotulos = [];
    const saldos = [];

    for (let i = 11; i >= 0; i--) {
        // Dia 0 do mês seguinte = último dia do mês que queremos
        const fimDoMes = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 0);
        const limite = i === 0 ? dataParaTexto(hoje) : dataParaTexto(fimDoMes);

        // Soma tudo o que aconteceu até o limite (inclui meses e anos anteriores)
        const receitasAteAqui = receitas.filter(function (item) {
            return item.data_movimentacao <= limite;
        });
        const despesasAteAqui = despesas.filter(function (item) {
            return item.data_movimentacao <= limite;
        });

        rotulos.push(MESES_ABREVIADOS[fimDoMes.getMonth()] + "/" + String(fimDoMes.getFullYear()).slice(-2));
        saldos.push(somar(receitasAteAqui) - somar(despesasAteAqui));
    }

    return { rotulos: rotulos, saldos: saldos };
}

// Gráfico de linha: evolução do saldo acumulado
function desenharEvolucaoSaldo(receitas, despesas) {
    const evolucao = saldoAcumuladoUltimos12Meses(receitas, despesas);

    criarGrafico("grafico_saldo", {
        type: "line",
        data: {
            labels: evolucao.rotulos,
            datasets: [{
                label: "Saldo acumulado",
                data: evolucao.saldos,
                borderColor: "#38bdf8",
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (contexto) {
                            return formatarValor(contexto.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: { callback: formatarEixoValor }
                }
            }
        }
    });
}

// Chamada pelo dashboard.js: desenha os quatro gráficos
// receitasPeriodo / despesasPeriodo: já filtradas por usuário e período
// receitasUsuario / despesasUsuario: todas as do usuário (para o saldo acumulado)
function atualizarGraficos(receitasPeriodo, despesasPeriodo, receitasUsuario, despesasUsuario) {
    if (typeof Chart === "undefined") {
        console.error("Chart.js não foi carregado. Confira o <script> no dashboard.html.");
        return;
    }

    desenharPizza("grafico_despesas", totaisPorCategoria(despesasPeriodo));
    desenharPizza("grafico_receitas", totaisPorCategoria(receitasPeriodo));
    desenharBarras(somar(receitasPeriodo), somar(despesasPeriodo));
    desenharEvolucaoSaldo(receitasUsuario, despesasUsuario);
}