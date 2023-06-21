const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  fsPromises.readFile('./data/users.json', { encoding: 'utf8' })
  .then((users) => {
    res.send({ data: JSON.parse(users) });
  })
  .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
})

router.get('/:id', (req, res) => {
  fsPromises.readFile(USERS_PATH, { encoding: 'utf8' })
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      const userFound = parsedUsersData.find((user) => user._id === req.params.id);

      if (!userFound) {
        res.status(404).send({ message: 'ID do usuário não encontrado' });
      } else {
        res.send({ data: userFound });
      }
    })
    .catch(() => res.status(500).send({ message: 'Ocorreu um erro' }));
});

module.exports = router;
