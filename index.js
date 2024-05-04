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
    res.json({message:"Deploy succesfull!"})
})
app.get('/api/fetch/location',(req, res)=>{
    res.json({message:"User location comming out, Please wait !"});
})
app.listen(port,()=>{
    console.log("Server running on port -> ", port);
})
