const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configuração do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'imagensAdd')); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('produtoImage');

app.use(express.json());
app.use(cors()); 

// Servir arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname))); 

// Rota principal para servir o index.html na página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter produtos
app.get('/api/produtos', (req, res) => {
    fs.readJson(path.join(__dirname, 'produtos.json'))
        .then(produtos => {
            res.json(produtos);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: 'Erro ao carregar produtos.' });
        });
});

// Rota para adicionar produtos
app.post('/api/produtos', upload, (req, res) => {
    console.log("Dados recebidos no servidor:", req.body);
    console.log("Imagem recebida:", req.file);

    const { produtoNome, produtoDescricao, produtoPreco, produtoCategoria } = req.body; 
    const imagem = req.file;

    if (!produtoNome || !produtoDescricao || !produtoPreco || !imagem || !produtoCategoria) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

    const novoProduto = { 
        nome: produtoNome, 
        descricao: produtoDescricao, 
        preco: parseFloat(produtoPreco), 
        categoria: produtoCategoria, 
        imageURL: `/imagensAdd/${imagem.filename}` 
    };

    fs.pathExists(path.join(__dirname, 'produtos.json'))
        .then(exists => {
            if (!exists) {
                return fs.writeJson(path.join(__dirname, 'produtos.json'), []);
            }
        })
        .then(() => fs.readJson(path.join(__dirname, 'produtos.json')))
        .then(produtos => {
            produtos.push(novoProduto);
            return fs.writeJson(path.join(__dirname, 'produtos.json'), produtos);
        })
        .then(() => {
            res.json({ success: true, message: "Produto adicionado com sucesso!", novoProduto }); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, message: 'Erro ao salvar o produto.' });
        });
});
// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
