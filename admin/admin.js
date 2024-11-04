function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; 
}

function showCategory(category) {
    const display = document.getElementById('categoryDisplay');
    const categories = document.querySelectorAll('.category');

   
    categories.forEach(cat => cat.style.display = 'none');

    
    const selectedCategory = document.getElementById(category);
    if (selectedCategory) {
        selectedCategory.style.display = 'block';
        display.style.display = 'flex'; 
    }
}

function editItem(itemName) {
    alert(`Abrindo formulário para editar: ${itemName}`);
}

function removeItem(itemName) {
    alert(`Removendo: ${itemName}`);
    
}
let currentItem; 

function editItem(itemName) {
    currentItem = itemName; 

    
    document.getElementById("editName").value = itemName; 
    document.getElementById("editDescription").value = "Descrição do item"; 
    document.getElementById("editPrice").value = "R$ 0,00"; 

    document.getElementById("editModal").style.display = "flex"; 
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none"; 
}

function saveEdit() {
    const name = document.getElementById("editName").value;
    const description = document.getElementById("editDescription").value;
    const price = document.getElementById("editPrice").value;

    console.log(`Item atualizado: ${name}, Descrição: ${description}, Preço: ${price}`);

    closeEditModal(); 
}
