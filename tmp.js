var mysql = require('mysql');

var connection = mysql.createConnection({
   host     : 'localhost',
   user     : '12984_u_nas_dzial',
   password : 'Palonek#3',
   database : '12984_u_nas_dzial'
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");  
    } else {
        console.log("Error connecting database ... ");
        console.log(err);  
    }
});

  connection.query('SELECT * FROM users',[], async function (error, results, fields) {
    if (error) {
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
        }
    });
