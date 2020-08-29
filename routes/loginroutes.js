const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port,
    () => console.log(`app listening at http://localhost:${port}`)
);

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : process.env.DB_USER,
   password : process.env.DB_PASSWORD,
   database : process.env.DB_NAME,
   port     : process.env.DB_PORT
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");  
    } else {
        console.log("Error connecting database ... \n\n");
        console.log(err);  
    }
});

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  var users={
     "email":req.body.email,
     "password":encryptedPassword
   }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
      }
  });
}

exports.login = async function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
            res.send({
              "code":200,
              "success":"login sucessfull"
            })
        }
        else{
          res.send({
               "code":204,
               "success":"Email and password does not match"
          })
        }
      }
      else{
        res.send({
          "code":206,
          "success":"Email does not exits"
            });
      }
    }
    });
}
