const express = require('express');
const app     = express();
const mysql   = require('mysql');

var sql = require('./sql_connection.js');

sql.connection.connect(sql.errorHandler);

exports.getPoints = async function(req,res){
    var email    = req.body.email;
    connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields){
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            if(results.length >0){
                res.send({
                    "code":200,
                    "success":results[0].points
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"There is no such user"
              })
            }
        }
    });
}

exports.getRating = async function(req, res) {
    var email = req.body.email;
    connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            if(results.length >0){
                const ratingPoints = results[0].rating;
                const ratingNum = results[0].rating_amount;
                const rating = (ratingPoints / ratingNum).toString();
                res.send({
                    "code":200,
                    "success":rating
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"There is no such user"
              })
            }
        }
    });
}

exports.addPoints = async function(req, res) {
    const email = req.body.email;
    const points = req.body.points;
    connection.query(`UPDATE users SET points = points + ${points} WHERE email = ${email} `, [], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            if(results.length >0){
                res.send({
                    "code":200,
                    "success":"Points updated successfully"
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"There is no such user"
              })
            }
        }
    });
}

exports.addRating = async function(req, res) {
    const email = req.body.email;
    const rating = req.body.rating;
    connection.query(`UPDATE users SET ratingNum = ratingNum + 1, ratingPoints = ratingPoints + ${rating} WHERE email = ${email}`
        , []
        , async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            if(results.length >0){
                res.send({
                    "code":200,
                    "success":"Rating added successfully"
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"There is no such user"
              })
            }
        }
    });
}

