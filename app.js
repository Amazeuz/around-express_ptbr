const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/aroundb')

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cards', cardsRouter);
app.use('/users', userRouter);

app.get('*', (req, res) => {
  res.send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT);
