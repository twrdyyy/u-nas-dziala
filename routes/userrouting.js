const express = require('express');
const app = express();
const mysql = require('mysql');
const e = require('express');

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

 function getDistance(ride, passengerCoords){

 }

function getClosestRide(params){
    
    connection.query("SELECT * FROM active_rides;", function(err, results, fields){
        if (err) return res.status(400).json({'status': 403, 'message': 'Query error'});
        var closestRide;
        var closestDistance = 0;

        results.forEach(ride => {
            if (!closestRide) {
                closestRide = ride;
                closestDistance = getDistance(ride, coords);
            } else {
                distance = getDistance(ride, coords);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestRide = ride;
                }
            }
        });

        return closestRide
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
        lat: req.body.startLat,
        long: req.body.startLong
    }

    const endParams = {
        lat: req.body.endLat,
        long: req.body.endLong
    }
    
    const departureTime = req.body.departureTime;
    const token = req.body.token;
    const maxPassengers = req.body.maxPassengers;
    const startLocation = req.body.startLocation;
    const endLocation = req.body.endLocation;

    // if (!startParams.lat || !startParams.long || !startParams.lat || !startParams.long || !departureTime || !token || !maxPassengers){
    //     return res.status(400).json({status: 400, message: "Incorrect data format."});
    // }

    var tokenInDb;
    connection.query(`SELECT * FROM tokens WHERE token = ,${token};`, function(err, results, fields) {
        if (results == []) {
            return res.status(403).json({status: 403, message: "Incorrect token."});
        } else tokenInDb = results[0];
    });

    connection.query(`INSERT INTO active_rides(
            "driver_id", 
            "passengers", 
            "departure_time", 
            "max_passengers", 
            "start_location", 
            "end_location", 
            "stops") 
        VALUES ("
            ${tokenInDb.user_id},
            "{[]}",
            "${departureTime}",
            ${maxPassengers},
            "${startLocation}",
            "${endLocation}",
            "{[]}"
        ");`, function(error, results, fields) {
            if (error) return res.status(400).json({'status': 400, 'message': 'Bad params.'});
            
            return res.status(200).json({'status': 200, 'message': 'Ride created.'})
        });
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
