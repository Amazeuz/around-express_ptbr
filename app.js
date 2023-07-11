const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a47811a6370a4ccb5e494a',
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', cardsRouter);
app.use('/', userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

/*
Opa revisor, então, o projeto não rodou porque eu usei mongodb://localhost
ao invés do mongodb://127.0.0.1, não sei pq o projeto não roda com localhost,
conversei com o tutor thiago uma meia hora pra resolver isso, mas não consegui,
só que no pc dele funciona com localhost, no meu e no seu não funcionou,
então a única solução que encontrei foi usar o 127.0.0.1 mesmo,
dai queria ver contigo se da pra passar o projeto assim, pq eu não faço idéia
de como corrigir esse problema, ai tu só me manda o projeto de novo pra
mim apagar esse comentário
*/

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .catch((err) => console.error(`Erro de conexão ao MongoDB: ${err}`));

app.listen(PORT);
