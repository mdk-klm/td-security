const express = require('express');
const {exec} = require('child_process');
const app = express();
const fileUpload = require("express-fileupload");


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(fileUpload());
  
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
  
app.get('/secret', (req,res)=>{
  res.sendFile(path.join(__dirname,'martin_antoine.png'));
  });

  app.get('/lfi', (req, res, next) => {
    const { q, file, mode } = req.query;
    if(mode === 'read'){
	console.log('read');
	console.log(file);
        if(file.indexOf('./') === -1){
		console.log('readfile');
            file_contents = fs.readFileSync(path.join(__dirname, 'searchable', req.query.file));
console.log(file_contents);
if(file_contents.indexOf(q)){
		console.log('sending file');
		searchPath=path.join(__dirname,'searchable',req.query.file);
		console.log(searchPath);
                res.sendFile(searchPath);
            }
        } else {
	console.log('hacked')
        }

    } else if(mode === 'write'){
	console.log('write');
        fs.writeFile(path.join(__dirname, 'searchable', req.query.file), req.query.q, () => {
            res.send('ok');
        });
    } 
 else if(mode==='execute') {
console.log('execute');
  const myFile=require('./lfi/'+file);
result=myFile();
res.send('File run '+result);

}else {
	console.log('file mode')
        res.status(400).send('tu es hacké');
    }
});



module.exports = app;