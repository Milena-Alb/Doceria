const express = require('express');
const fs = require('fs-extra'); // Importando a biblioteca fs-extra
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para permitir o parsing de JSON
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../assets')));

// Caminho do arquivo de produtos
const produtosFilePath = path.join(__dirname, '../produtos.json');

// Endpoint para obter produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const data = await fs.readFile(produtosFilePath, 'utf8');
        const produtos = JSON.parse(data);
        res.send(produtos);
    } catch (err) {
        console.error('Erro ao ler produtos:', err);
        res.status(500).send('Erro ao ler produtos.');
    }
});

// Endpoint para adicionar um novo produto
app.post('/api/produtos', async (req, res) => {
    const novoProduto = req.body;
    console.log('Novo Produto:', novoProduto);

    try {
        const data = await fs.readFile(produtosFilePath, 'utf8');
        const produtos = data ? JSON.parse(data) : [];
        
        produtos.push(novoProduto);
        await fs.writeFile(produtosFilePath, JSON.stringify(produtos, null, 2));

        // Resposta de sucesso
        res.status(201).json({ success: true, message: 'Produto adicionado com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar produto:', err);
        // Resposta de erro
        res.status(500).json({ success: false, message: 'Erro ao adicionar produto.' });
    }
});


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
