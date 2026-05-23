document.addEventListener('DOMContentLoaded', function () {
    
    const unidadeSelect = document.getElementById('unidade_id');

    unidadeSelect.addEventListener('change', function () {
        carregarLinhasSelect(this.value);
    });

    const btnFiltrar = document.getElementById('btn-filtrar');

    btnFiltrar.addEventListener('click', function () {

        const unidadeId = document.getElementById('unidade_id').value;
        const linhaId = document.getElementById('linha_id').value;
        const mes = document.getElementById('mes').value;
        const ano = document.getElementById('ano').value;

        const warningMessage = document.getElementById('warning-message');

        if (!unidadeId) {
            warningMessage.innerHTML = `
                <p class="text-sm text-red-500 mt-1">
                    É necessário selecionar uma unidade para carregar os dados do dashboard
                </p>
            `;
            return;
        }
        warningMessage.innerHTML = '';
        carregarLinhas(unidadeId, linhaId, mes, ano);
        carregarGrafico(unidadeId, linhaId, mes, ano);
    });
});

function carregarLinhasSelect(unidadeId) {

    const selectLinha = document.getElementById('linha_id');

    selectLinha.innerHTML = `
        <option value="">
            Carregando...
        </option>
    `;

    fetch(`/dashboard/unidade/${unidadeId}/linhas`)
        .then(res => res.json())
        .then(data => {
            selectLinha.innerHTML = `
                <option value="">
                    Selecione uma linha
                </option>
            `;
            data.forEach(linha => {
                selectLinha.innerHTML += `
                    <option value="${linha.id}">
                        ${linha.linha}
                    </option>
                `;
            });
        })
        .catch(error => {
            console.error(error);
            selectLinha.innerHTML = `
                <option value="">
                    Erro ao carregar linhas
                </option>
            `;
        });
}

function carregarLinhas(unidadeId, linhaId, mes, ano) {
    const params = new URLSearchParams({
        mes,
        ano
    });

    if (linhaId) {
        params.append('linha_id', linhaId);
    }

    fetch(`/dashboard/linhas/${unidadeId}?${params.toString()}`)
        .then(res => res.json())
        .then(data => {

            const container = document.getElementById('dashboard-lista');

            container.innerHTML = data.map(l => {

                const producao = l.producoes?.[0] || {
                    quantidade_produzida: 0,
                    quantidade_defeituosa: 0,
                    produtividade: 0
                };

                return `
                    <div class="space-y-3">
                        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-gray-50 hover:bg-gray-100 transition rounded-2xl px-5 py-4 mb-4 border border-gray-200">
                            <div class="flex items-center gap-4 min-w-[140px]">
                                <div>
                                    <h3 class="text-base font-bold text-gray-800">
                                        Linha: ${l.linha}
                                    </h3>
                                    <p class="text-sm text-gray-500">
                                        ${l.unidade?.unidade || '-'}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-3">
                                <div class="bg-green-500 text-white rounded-xl px-4 py-3 min-w-[140px] shadow-sm">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-xs uppercase tracking-wide text-green-100">
                                            Produção
                                        </span>
                                    </div>
                                    <div class="text-2xl font-bold">
                                        ${producao.quantidade_produzida}
                                    </div>
                                </div>
                                <div class="bg-red-500 text-white rounded-xl px-4 py-3 min-w-[140px] shadow-sm">
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-xs uppercase tracking-wide text-red-100">
                                            Perdas
                                        </span>
                                    </div>
                                    <div class="text-2xl font-bold">
                                        ${producao.quantidade_defeituosa}
                                    </div>
                                </div>
                                <div class="bg-gray-900 text-white rounded-xl px-5 py-3 min-w-[140px] shadow-md border border-gray-700">
                                    <div class="text-xs uppercase tracking-wide text-gray-400 mb-1">
                                        Eficiência
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="text-3xl font-extrabold text-yellow-300">
                                            ${producao.produtividade}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }).join('');
        })
        .catch(error => {
            console.error(error);
        });
}

function carregarGrafico(unidadeId, linhaId, mes, ano) {

    const params = new URLSearchParams({
        mes,
        ano
    });

    if (linhaId) {
        params.append('linha_id', linhaId);
    }

    fetch(`/dashboard/grafico/${unidadeId}?${params.toString()}`)
        .then(res => res.json())
        .then(data => {

            const labels = data.map(i => i.linha);
            const valores = data.map(i => i.produtividade);
            const cores = data.map(i => i.cor);

            const canvas = document.getElementById('graficoProdutividade');
            const graficoExistente = Chart.getChart(canvas);

            if (graficoExistente) {
                graficoExistente.destroy();
            }

            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Eficiência (%)',
                        data: valores,
                        backgroundColor: cores,
                        borderRadius: 12
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}