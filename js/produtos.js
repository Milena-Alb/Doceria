function exibirCategoria(categoriaId) {
const categorias = document.querySelectorAll('.categoria');
categorias.forEach((categoria) => {
categoria.style.display = 'none';
});
  
document.getElementById(categoriaId).style.display = 'block';
}
  
document.addEventListener('DOMContentLoaded', () => {
exibirCategoria('kitFesta');
});
  