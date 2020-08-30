const express = require('express');
const app = express();
const mysql = require('mysql');

const initialPoints = 0;
const initialRating = 0;
const initialRatingAmount = 0;

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : '12984_u_nas_dzial',
   password : 'Palonek#3',
   database : '12984_u_nas_dzial'
});

connection.connect(errorHandler = function(err){
    if(!err) {
        console.log("Database is connected ... ");  
    } else {
        console.log("Error connecting database ... ");
        console.log(err);  
    }
});

exports.test = function(req, res){
  connection.query('SELECT * FROM users',[], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
        res.send({
            "elo":"dupa"
        })
    }
    });
}

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = password 
  var users={
    "name"          :  req.body.name,
    "surname"       :  req.body.surname,
    "email"         :  req.body.email,
    "password"      :  encryptedPassword,
    "rating"        :  initialRating,
    "rating_amount" :  initialRatingAmount,
    "points"        :  initialPoints
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
  var email    = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
	    const comparision = (password == results[0].password)
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
