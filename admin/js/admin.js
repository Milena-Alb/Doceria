
// Toggle da visibilidade do menu lateral
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Alterna a visibilidade dos painéis de categorias
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Exibe uma categoria específica e esconde a mensagem de boas-vindas
function showCategory(category) {
    const display = document.getElementById('categoryDisplay');
    const categories = document.querySelectorAll('.category');
    categories.forEach(cat => cat.style.display = 'none');
    const selectedCategory = document.getElementById(category);

    if (category === 'home') {
        mostrarMensagemBoasVindas();
        display.style.display = 'none';
    } else if (selectedCategory) {
        esconderItens();
        selectedCategory.style.display = 'block';
        display.style.display = 'flex';}}

// Remove um item pelo nome
function removeItem(itemNome) {
    document.querySelectorAll('.item').forEach(item => {
        if (item.querySelector('h3').innerText === itemNome) {
            item.remove();
        }
    });
}
function editarItem(nome) {
    fetch('/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            const produto = produtos.find(p => p.nome === nome);
            if (produto) {
                document.getElementById("editarProdutoNome").value = produto.nome;
                document.getElementById("editarProdutoDescricao").value = produto.descricao;
                document.getElementById("editarProdutoPreco").value = produto.preco;
                window.produtoEditando = produto; 
                document.getElementById("editarProdutoModal").style.display = "flex";}})
        .catch(error => console.error("Erro:", error));
}

// Fecha o modal de edição
function fecharEdicao() {
    document.getElementById("editModal").style.display = "none";
}

// Salva a edição do item
function salvarEdicaoProduto() {
    const nome = document.getElementById("editarProdutoNome").value;
    const descricao = document.getElementById("editarProdutoDescricao").value;
    const preco = parseFloat(document.getElementById("editarProdutoPreco").value);
    const imagemInput = document.getElementById("editarProdutoImagem").files[0];

    if (!nome || !descricao || isNaN(preco)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;}
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("preco", preco);
    if (imagemInput) {
        formData.append("imagem", imagemInput);
    }
    fetch(`/api/produtos${window.produtoEditando.id}`, {
        method: 'PUT',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Produto editado com sucesso!");
            fecharEdicaoProduto();
        } else {
            alert("Erro ao editar produto: " + data.message);}
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao editar o produto.");
    });
}

// Atualiza a exibição do item editado
function atualizarItem() {
    document.querySelectorAll('.item').forEach(item => {
        if (item.querySelector('h3').innerText === currentItem.nome) {
            item.querySelector('p:nth-child(3)').innerText = currentItem.descricao;
            item.querySelector('p:nth-child(4)').innerText = `R$ ${currentItem.preco}`;
        }
    });
}
// Esconde os elementos de boas-vindas
function esconderItens() {
    document.getElementById("imagem-logo").style.display = 'none';
    document.getElementById("mensagem").style.display = 'none';
}

// Mostra a mensagem de boas-vindas
function mostrarMensagemBoasVindas() {
    document.getElementById("imagem-logo").style.display = 'block';
    document.getElementById("mensagem").style.display = 'block';
}

function salvarNovoItem() {
    const form = document.getElementById("addProdutoForm");
    const formData = new FormData(form);
    const produto = {
        nome: document.getElementById("produtoNome").value,
        descricao: document.getElementById("produtoDescricao").value,
        preco: document.getElementById("produtoPreco").value,
        imageURL: URL.createObjectURL(document.getElementById("produtoImage").files[0])
    };
    adicionarNovoProduto(produto);

    fetch('/api/produtos', { 
        method: 'POST',
        body: JSON.stringify(produto), 
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Produto adicionado com sucesso!");
            fecharAdicaoProduto();
            form.reset(); 
        } else {
            alert("Erro ao adicionar produto.");
        }
    })
    .catch(error => console.error("Erro:", error));
}

// Função para fechar o modal de adição
function closeAddModal() {
    document.getElementById("addProduto").style.display = "none";
}

// Função para adicionar a nova div do produto
function adicionarNovoProduto(produto) {
    const novaDivItem = document.createElement("div");
    novaDivItem.classList.add("item");
    novaDivItem.innerHTML = `
        <img src="${produto.imageURL || '../../assets/default.jpg'}" alt="${produto.nome}" class="category-image">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>R$ ${produto.preco}</p>
        <div class="buttons">
            <button onclick="editarItem('${produto.nome}')">Editar</button>
            <button onclick="removeItem('${produto.nome}')">Remover</button>
        </div>
    `;
    const categoria = Array.from(document.querySelectorAll('.category')).find(cat => cat.style.display === 'block');
    if (categoria) {
        categoria.appendChild(novaDivItem);
    }
}
// Função para exibir o formulário de adição de produto
function mostrarFormularioAdicionarProduto() {
    document.getElementById("addProduto").style.display = "block";
}
// Função para fechar o modal de adição
function fecharAdicaoProduto() {
    document.getElementById("addProduto").style.display = "none";
}
function fecharEdicaoProduto() {
    document.getElementById("editarProdutoModal").style.display = "none";
}
