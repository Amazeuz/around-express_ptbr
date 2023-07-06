const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .catch((err) => console.error(`Erro de conexão ao MongoDB: ${err}`));

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a47811a6370a4ccb5e494a',
  };

  next();
});

app.use('/cards', cardsRouter);
app.use('/users', userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT);
