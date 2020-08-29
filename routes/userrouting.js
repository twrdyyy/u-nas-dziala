const express = require('express');
const app = express();
const mysql = require('mysql');

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

function getClosestDriver(params){
    
    connection.query("SELECT * FROM active_rides", function(err, results, fields){
        if (err) throw err;
        var closestDriver;
    });
    // pull all drivers from the database
    // closest driver = null
    // for driver in drivers
    //      if dist(driver, params) < closest driver
    //             closest driver = driver
    // return closest driver
}

exports.driverRoute = async function (req, res){
    const startParams = {
        lat: req.query.startLat,
        long: req.query.startLong
    }

    const endParams = {
        lat: req.query.endLat,
        long: req.query.endLong
    }
    
    const departureTime = req.query.departureTime;

    if (!startParams.lat || !startParams.long || !startParams.lat || !startParams.long || !departureTime){
        return res.status(400).json({status: 400, message: "Incorrect data format."});
    }

    connection.query(```INSERT INTO active_rides(
            "driver_id", 
            "passengers", 
            "departure_time", 
            "max_passengers", 
            "start_location", 
            "end_location", 
            "stops") 
        VALUES ("
            ```+  +```
        ")```)
}

exports.userRoute = async function (req, res){
    const startParams = {
        lat: req.query.startLat,
        long: req.query.startLong
    }

    const endParams = {
        lat: req.query.endlat,
        long: req.query.endLong
    }
    
    if (!startParams.lat || !startParams.long || !startParams.lat || !startParams.long){
        return res.status(400).json({status: 400, message: "Incorrect data format."});
    }
}
