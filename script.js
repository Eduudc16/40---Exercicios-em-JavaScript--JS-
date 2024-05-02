async function consultarFeriados() {
    const ano = document.getElementById("anoInput").value;

    // Verificar se o ano foi digitado
    if (ano === "") {
        alert("Por favor, insira um ano.");
        return;
    }

    // Construir a URL da API
    const url = `https://brasilapi.com.br/api/feriados/v1/${ano}`;

    try {
        // Fazer a requisição à API
        const response = await fetch(url);

        // Verificar se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao consultar feriados.');
        }

        // Converter a resposta para JSON
        const data = await response.json();

        // Exibir os feriados na página
        exibirFeriados(data);
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

function exibirFeriados(feriados) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = ""; // Limpar resultados anteriores

    if (feriados.length === 0) {
        resultadoDiv.innerText = "Nenhum feriado encontrado para o ano especificado.";
        return;
    }

    const listaFeriados = document.createElement("ul");

    feriados.forEach(feriado => {
        const itemLista = document.createElement("li");
        itemLista.textContent = `🎉 ${feriado.date}: ${feriado.name}`; // Adiciona um emoji antes do nome do feriado
        listaFeriados.appendChild(itemLista);
    });

    resultadoDiv.appendChild(listaFeriados);
}
