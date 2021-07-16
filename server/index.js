const app = require('./config/express-config');

const User = require('./users/model/User');

app.get('/', (req, res) => {
  res.send('<h1>Hello World<h1>');
});

app.get('/user', (req, res) => {
  const pessoa = {
    nome: 'Gabriel',
    sobrenome: 'Cabral',
  };

  res.json(pessoa);
});

app.post('/mirror', (req, res) => {
  res.json(req.body);
});

app.listen(3000, 'localhost', () => console.log('Servidor Rodando'));

