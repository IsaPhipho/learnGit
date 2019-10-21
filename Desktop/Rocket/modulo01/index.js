const express = require('express');

const server = express();

server.use(express.json());

const users = ['Diego', 'Cláudio', 'Victor', 'IsaPhipho'];

server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  
  next();

  console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
  if(!req.body.name) {
    return res.status(400).json({ error: 'User name is required'});
  }
  return next();
}

function CheckUserInArray(req, res, next) {
  const user = users[req.params.index];

  if(!user) {
    return res.status(400).json({ error: 'User does not exists'});
  }
   req.user = user;

   return next();
}

server.get('/users', (req, res) => {
  return res.json(req.user);
});

//localhost.3000/test
//server.get('/teste', (req, res) => {
  //return res.send('Hello World'),    *(apenas para envio de mensagem)
  //return res.json({message: 'Hello World'});
  //const nome = req.query.nome;
  //return res.json({message: `Hello ${nome}`});
  //server.get('/users/:id', (req, res) => {
    //const id = req.params.id;
    //const {id} = reg.params;
    //return res.json({message: `Buscando o usuário ${id}`});
server.get('/users/:index', CheckUserInArray, (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put('/users/:index', checkUserExists, CheckUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete('/users/:index', CheckUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);

  // return res.json(users);
  return res.send();
})

server.listen(3000);
