const express = require('express');

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/users', (req, res, next) => {
    const user = [
      {
        id: '1',
        gender: 'male',
        lastName: 'georges',
        firstName :" moustaki",
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        id: '2',
        gender: 'female',
        lastName: 'sand',
        firstName: 'georges',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(user);
  });

module.exports = app;