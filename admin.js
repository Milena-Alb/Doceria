function carregarProdutos() {
    fetch('/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            console.log("Produtos carregados:", produtos); 
            produtos.forEach(produto => {
                adicionarNovoProduto(produto);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));
}

// Chame a função ao carregar a página
window.onload = function() {
    carregarProdutos();
};

// Toggle da visibilidade do menu lateral
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Alterna a visibilidade dos painéis de categorias
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Exibir uma categoria específica
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
        display.style.display = 'flex'; 
    }
}

// Remove um item pelo nome
function removeItem(itemNome) {
    document.querySelectorAll('.item').forEach(item => {
        if (item.querySelector('h3').innerText === itemNome) {
            item.remove();
        }
    });
}

// Editar um item
function editarItem(nome) {
    fetch('/api/produtos')
        .then(response => response.json())
        .then(produtos => {
            const produto = produtos.find(p => p.nome === nome);
            if (produto) {
                document.getElementById("editarProdutoNome").value = produto.nome;
                document.getElementById("editarProdutoDescricao").value = produto.descricao;
                document.getElementById("editarProdutoPreco").value = produto.preco;
                document.getElementById("editarProdutoImagem").value = ""; // Limpa o campo de imagem
                window.produtoEditando = produto; 
                document.getElementById("editarProdutoModal").style.display = "flex";
            }
        })
        .catch(error => console.error("Erro:", error));
}

// Fecha o modal de edição
function fecharEdicaoProduto() {
    document.getElementById("editarProdutoModal").style.display = "none";
}

// Salvar a edição do produto
function salvarNovoItem() {
    const form = document.getElementById("addProdutoForm");
    const formData = new FormData(form);

    fetch('/api/produtos', { 
        method: 'POST',
        body: formData, 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Produto adicionado com sucesso!");
            fecharAdicaoProduto();
            form.reset(); 
            adicionarNovoProduto(data.novoProduto); 
        } else {
            alert("Erro ao adicionar produto: " + data.message);
        }
    })
    .catch(error => console.error("Erro:", error));
}

// Atualiza a exibição do item editado
function atualizarItem(produtoEditado) {
    document.querySelectorAll('.item').forEach(item => {
        if (item.querySelector('h3').innerText === produtoEditado.nome) {
            item.querySelector('p:nth-child(3)').innerText = produtoEditado.descricao;
            item.querySelector('p:nth-child(4)').innerText = `R$ ${produtoEditado.preco}`;
            item.querySelector('img').src = produtoEditado.imageURL; // Atualiza a imagem
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

// Salvar um novo produto
function salvarNovoItem() {
    const form = document.getElementById("addProdutoForm");
    const formData = new FormData(form);

    fetch('/api/produtos', { 
        method: 'POST',
        body: formData, 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Produto adicionado com sucesso!");
            fecharAdicaoProduto();
            form.reset(); 
            adicionarNovoProduto(data.novoProduto); 
        } else {
            alert("Erro ao adicionar produto: " + data.message);
        }
    })
    .catch(error => console.error("Erro:", error));
}
// Função para fechar o modal de adição
function closeAddModal() {
    document.getElementById("addProduto").style.display = "none";
}

function adicionarNovoProduto(produto) {
    console.log("Adicionando produto:", produto); 
    const novaDivItem = document.createElement("div");
    novaDivItem.classList.add("item");
    novaDivItem.innerHTML = `
        <img src="${produto.imageURL || '/imagensAdd/default.jpg'}" alt="${produto.nome}" class="category-image">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>R$ ${produto.preco}</p>
        <div class="buttons">
            <button onclick="editarItem('${produto.nome}')">Editar</button>
            <button onclick="removeItem('${produto.nome}')">Remover</button>
        </div>
    `;

    // Adicione o produto à categoria correta
    const categoria = document.getElementById(produto.categoria); 
    if (categoria) {
        console.log(`Adicionando produto à categoria: ${produto.categoria}`); 
        categoria.appendChild(novaDivItem);
        categoria.style.display = 'block'; 
    } else {
        console.error(`Categoria não encontrada: ${produto.categoria}`); 
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
