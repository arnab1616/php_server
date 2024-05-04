const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

  var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:null,
    database:"arnabdb"
  })

app.get('/', (req,res)=>{
    connection.connect(function(err){
    if(err){
      console.log(err.code)
      console.log(err.fatal)
    } else{
        console.log("phpMyAdmin connected successfull!");
    }
  })
  $query = 'SELECT * FROM xyz';

    connection.query($query, function(err, rows, fields){
    if(err){
      console.log("An error ocoure");
      return;
    }
    console.log("Qurey succesfull! ", rows);
      res.json(rows);
  })
    connection.end(function(){
    console.log("Connection closed");
  })
    // res.json({message:"Deploy succesfull!"})
})
app.get('/api/fetch/location',(req, res)=>{
    res.json({message:"User location comming out, Please wait !"});
})
app.listen(port,()=>{
    console.log("Server running on port -> ", port);
})
