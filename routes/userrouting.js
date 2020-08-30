const express = require('express');
const app = express();
const mysql = require('mysql');
const axios = require('axios');
const { response } = require('express');

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
    const departureTime = req.body.departureTime;
    const token = req.body.token;
    const maxPassengers = req.body.maxPassengers;
    //const startLocation = {lat: "50.068871", long: "19.918272"};
    const startLocation = req.body.startLocation;
    //const endLocation = {lat: "50.067067", long: "19.930557"};
    const endLocation = req.body.endLocation;

    var tokenInDb;
    //res.send({'code': 200, 'message': `https://api.tomtom.com/routing/1/calculateRoute/${startLocation.lat}%2C${startLocation.long}%3A${endLocation.lat}%2C${endLocation.long}/json?avoid=unpavedRoads&key=YoQ1hOJcdkXaLdxTfEexOAzTmm4GElrw`});
    connection.query(`SELECT * FROM tokens WHERE token = "${token}";`, function(err, results, fields) {
        if (err) res.send({code: 400, message: err});
        if (results == []) {
            res.send({code: 403, message: "Incorrect token."});
        } else {
            tokenInDb = results[0];
            //res.send({'code': 200, 'message': tokenInDb});
            var points;
            //res.send({'code': 200, 'message': 'https://api.tomtom.com/routing/1/calculateRoute/${startLocation.lat}%2C${startLocation.long}%3A${endLocation.lat}%2C${endLocation.long}/json?avoid=unpavedRoads&key=YoQ1hOJcdkXaLdxTfEexOAzTmm4GElrw'});
            axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${startLocation.lat}%2C${startLocation.long}%3A${endLocation.lat}%2C${endLocation.long}/json?avoid=unpavedRoads&key=YoQ1hOJcdkXaLdxTfEexOAzTmm4GElrw`)
                .then((response) => {
                    points = response.data.routes[0].legs[0].points;
                    //res.send({'code': 200, 'points': points});
                    var query  = `INSERT INTO active_rides (
                        driver_id, passengers, departure_time, max_passengers, start_location, end_location, stops, accepted) VALUES (
                        ${tokenInDb.user_id},
                        "",
                        "${departureTime}",
                        ${maxPassengers},
                        "${connection.escape(JSON.stringify(startLocation))}",
                        "${connection.escape(JSON.stringify(endLocation))}",
                        "${connection.escape(JSON.stringify(points))}",
                        false
                    );`
                    connection.query(query, function(error, results, fields) {
                        if (error) res.send({'code': 400, 'message': error});
                        
                        res.send({'code': 200, 'points': points});
                    }
                );
            });
        } 
    });
}

exports.getRoute = async function (req, res) {
    const startLocation = req.body.startLocation;
    const endLocation = req.body.endLocation;

    axios.get(`https://api.tomtom.com/routing/1/calculateRoute/${startLocation.lat}%2C${startLocation.long}%3A${endLocation.lat}%2C${endLocation.long}/json?avoid=unpavedRoads&key=YoQ1hOJcdkXaLdxTfEexOAzTmm4GElrw`)
        .then((response) => {
                points = response.data.routes[0].legs[0].points;    
                res.send({'code': 200, 'points': points});
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
        return res.json({status: 400, message: "Incorrect data format."});
    }
}
