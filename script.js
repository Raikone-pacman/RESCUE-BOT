const loginForm = document.getElementById('login-form');
const senhaInput = document.getElementById('senha');
const loginScreen = document.getElementById('login-screen');
const mainContent = document.getElementById('main-content');
const formularioPeca = document.getElementById('formulario-peca');
const tabelaPecasBody = document.querySelector('#tabela-pecas tbody');

// Defina sua senha aqui.
const SENHA_CORRETA = "dragbotjac123";

// Função para exibir as peças na tabela
function exibirPeca(peca, index) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-index', index); // Adiciona um índice para a exclusão
    newRow.innerHTML = `
        <td>${peca.nome}</td>
        <td>${peca.quantidade}</td>
        <td><input type="checkbox" class="tem-checkbox" ${peca.tem ? 'checked' : ''}></td>
        <td>R$ ${peca.valor ? peca.valor.toFixed(2) : '0,00'}</td>
        <td>${peca.lugar}</td>
        <td>${peca.imagemUrl ? `<img src="${peca.imagemUrl}" alt="Imagem da peça" style="width: 100px;">` : 'N/A'}</td>
        <td><button class="btn-excluir">Excluir</button></td>
    `;
    tabelaPecasBody.appendChild(newRow);
}

// Função para carregar as peças salvas no localStorage
function carregarPecas() {
    const pecasSalvas = JSON.parse(localStorage.getItem('pecas')) || [];
    tabelaPecasBody.innerHTML = ''; // Limpa a tabela antes de carregar
    pecasSalvas.forEach((peca, index) => exibirPeca(peca, index));
}

// Ação para salvar a peça
formularioPeca.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const valor = document.getElementById('valor').value;
    const lugar = document.getElementById('lugar').value;
    const imagemInput = document.getElementById('imagem');

    const imagemUrl = imagemInput.files[0] ? URL.createObjectURL(imagemInput.files[0]) : '';

    const novaPeca = {
        nome,
        quantidade: parseInt(quantidade),
        tem: false,
        valor: parseFloat(valor),
        lugar,
        imagemUrl
    };

    const pecasAtuais = JSON.parse(localStorage.getItem('pecas')) || [];
    pecasAtuais.push(novaPeca);

    localStorage.setItem('pecas', JSON.stringify(pecasAtuais));

    carregarPecas(); // Recarrega a tabela para exibir a nova peça com os botões
    formularioPeca.reset();
});

// Ação de login
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (senhaInput.value === SENHA_CORRETA) { 
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        carregarPecas();
    } else {
        alert("Senha incorreta!");
        senhaInput.value = '';
    }
});

// Adiciona um ouvinte de evento para os botões de exclusão
tabelaPecasBody.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-excluir')) {
        const row = event.target.closest('tr');
        const index = row.getAttribute('data-index');

        let pecasAtuais = JSON.parse(localStorage.getItem('pecas')) || [];
        pecasAtuais.splice(index, 1); // Remove a peça da lista pelo índice

        localStorage.setItem('pecas', JSON.stringify(pecasAtuais));
        carregarPecas(); // Recarrega a tabela para atualizar a lista
    }
});

// Adiciona um ouvinte de evento para o checkbox "Tem?"
tabelaPecasBody.addEventListener('change', function(event) {
    if (event.target.classList.contains('tem-checkbox')) {
        const row = event.target.closest('tr');
        const index = row.getAttribute('data-index');

        let pecasAtuais = JSON.parse(localStorage.getItem('pecas')) || [];
        pecasAtuais[index].tem = event.target.checked; // Atualiza o status da peça

        localStorage.setItem('pecas', JSON.stringify(pecasAtuais));
    }
});