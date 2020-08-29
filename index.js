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
