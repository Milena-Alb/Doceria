// Função para alternar a visibilidade do menu lateral
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}
// Função para alternar a visibilidade dos painéis
function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; 
}
// Função para exibir uma categoria e esconder itens de boas-vindas
function showCategory(category) {
    const display = document.getElementById('categoryDisplay');
    const categories = document.querySelectorAll('.category');
   // Oculta todas as categorias
    categories.forEach(cat => cat.style.display = 'none');
    const selectedCategory = document.getElementById(category);
    if (category === 'home') {
        mostrarMensagemBoasVindas();
        display.style.display = 'none'; 
    } else {
        const selectedCategory = document.getElementById(category);
        if (selectedCategory) {
            esconderItens();
            selectedCategory.style.display = 'block';
            display.style.display = 'flex'; 
        }
    }
}
// Função para remover um item
function removeItem(itemName) {
    alert(`Removendo: ${itemName}`);
    
}
// Função para editar um item específico
let currentItem; 
function editItem(itemName) {
    // Armazena o item atual para futura referência
    currentItem = itemName; 

    // Exibe um alerta informando o item a ser editado (opcional)
    alert(`Abrindo formulário para editar: ${itemName}`);

    // Preenche os campos do modal de edição com os valores do item
    document.getElementById("editName").value = itemName; 
    document.getElementById("editDescription").value = "Descrição do item"; 
    document.getElementById("editPrice").value = "R$ 0,00"; 

    // Exibe o modal de edição
    document.getElementById("editModal").style.display = "flex"; 
}
// Função para fechar o modal de edição
function closeEditModal() {
    document.getElementById("editModal").style.display = "none"; 
}
// Função para salvar a edição do item
function saveEdit() {
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const price = document.getElementById("editPrice").value;
    currentItem.nome = name;
    currentItem.descricao = description;
    currentItem.preco = price;
    console.log(`Item atualizado: ${name}, Descrição: ${description}, Preço: ${price}`);
    closeEditModal(); 
    updateItemDisplay();
}
// Função para atualizar a exibição do item editado
function updateItemDisplay() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        const itemName = item.querySelector('h3').innerText;
        if (itemName === currentItem.nome) {
            item.querySelector('p:nth-child(3)').innerText = currentItem.descricao;
            item.querySelector('p:nth-child(4)').innerText = `R$ ${currentItem.preco}`;
        }
    });
}

function esconderItens(){
    document.getElementById("imagem-logo").style.display = 'none';
    document.getElementById("mensagem").style.display = 'none'; 
}
function mostrarMensagemBoasVindas() {
    const imagem = document.getElementById("imagem-logo");
    const mensagem = document.getElementById("mensagem");

    imagem.style.display = 'block';
    mensagem.style.display = 'block';
}
