const express = require('express');
const {exec} = require('child_process');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  
  app.get('/trace', (req, res) => {
    const file = req.query.file;
  
    const command = `git log --oneline ${file}`;
  
    exec(command, (err, output) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  
      
      res.send(output);
    });
  });

app.get('/users', (req, res, next) => {
    
    const user = [
      {
        id: '1',
        gender: 'male',
        lastName: 'georges',
        firstName :" moustaki",
        passwd: "youpi",
        userId: 'qsomihvqios',
      },
      {
        "id": '2',
        gender: 'female',
        lastName: 'sand',
        firstName: 'georges',
        passwd: "youpi",
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(user);
  });



module.exports = app;