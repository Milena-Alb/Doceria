const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para permitir o parsing de JSON
app.use(express.json());

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname))); // Certifique-se de que isso está configurado para a raiz

// Definir a rota para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve o index.html na raiz
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
