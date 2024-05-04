const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.json({message:"Deploy succesfull!"})
})
app.get('api/fetch/location',(req, res)=>{
    res.json({message:"User location comming out, Please wait !"});
})
app.listen(port,()=>{
    console.log("Server running on port -> ", port);
})