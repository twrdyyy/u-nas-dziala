const express = require('express');
const app     = express();
const mysql   = require('mysql');

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

exports.lookForRide = async function(req, res) {
    var lonStart = req.body.lonStart;
    var latStart = req.body.latStart; 
    var lonEnd = req.body.lonEnd;
    var latEnd = req.body.latEnd; 
    
    connection.query('SELECT * FROM active_rides WHERE passengers=""',[], async function (error, results, fields){
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            if(results.length > 0){
                res.send({
                    "code":200,
                    "success":results[0].end_location,
                    "driver_id":results[0].driver_id
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"There is no active drivers nearby"
              })
            }
        }
    });
}

exports.askForRide = async function(req, res) {
    var driverID = req.body.driver_id;
    var userID = req.body.user_id;

    connection.query(`UPDATE active_rides SET passengers=${userID} where driver_id="${driverID}"`,[], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "success":"Waiting for driver to response"
            })
        }
    });
}

exports.acceptRide = async function(req, res) {
    var driverID = req.body.driver_id;

    connection.query(`UPDATE active_rides SET accepted=true where driver_id="${driverID}"`,[], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            res.send({
                "code":200,
                "success":"Route accepted"
            })
        }
    });
}

exports.checkRide = async function(req, res) {
    var driverID = req.query.driver_id;

    connection.query(`SELECT * from active_rides where driver_id="${driverID}" AND accepted=true`,[], async function (error, results, fields) {
        if (error) {
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        } else {
            if(results.length > 0){
                res.send({
                    "code":200,
                    "success":results[0].end_location,
                })
            }
            else{
                res.send({
                   "code":204,
                   "success":"Driver did not accept the ride"
              })
            }
        }
    });
}


