const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const CARDS_PATH = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  fsPromises.readFile(CARDS_PATH, { encoding: 'utf8' })
    .then((cards) => {
      res.send({ data: JSON.parse(cards) });
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
});

module.exports = router;
