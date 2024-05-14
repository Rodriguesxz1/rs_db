// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agua_rs'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Rota para processar o formulário de doação
app.post('/doar', (req, res) => {
  const { nome, email, quantidade } = req.body;
  const doacao = { nome, email, quantidade };
  db.query('INSERT INTO doacoes SET ?', doacao, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
