const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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
  const encryptedPassword = password //await bcrypt.hash(password, saltRounds)
  var users={
    "name":req.body.name,
    "surname":req.body.surname,
    "email":req.body.email,
    "password":encryptedPassword,
    "rating":0,
    "rating_amount":0,
    "points":0
   }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
	console.log(error);
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
        //const comparision = await bcrypt.compare(password, results[0].password)
	const comparision = await (password == results[0].password)
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
