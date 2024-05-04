const express = require('express')
const pool = require('./phpDB.js')

const app = express();
const port = 3000;
// const 
app.get('/', (req,res)=>{
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting MySQL connection:', err);
        return;
      }
    
      connection.query('SELECT * FROM user', (queryErr, results) => {
        connection.release(); // Release the connection back to the pool after use
    
        if (queryErr) {
          console.error('Error executing query:', queryErr);
          res.json({error: queryErr.message})
        } else {
          console.log('Query result:', results);
            res.json(results)
        }
      });
    });
})
app.get('/api/fetch/location', async(req, res)=>{
    try{
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const response1 = await fetch(`https://ipapi.co/${data.ip}/json/`);
        const userData = await response1.json();
        // pool.getConnection((err, connection) => {
        //   if (err) {
        //     console.error('Error getting MySQL connection:', err);
        //     return;
        //   }
        
        //   connection.query(`INSERT INTO user_geolocation (ip_address,network,city,region,country,postal_code,latitude,longitude) VALUES('${userData.ip}','${userData.network}','${userData.city}','${userData.region}','${userData.country_name}','${userData.postal}','${userData.latitude}','${userData.longitude}')`, (queryErr, results) => {
        //     connection.release(); 
        
        //     if (queryErr) {
        //       console.error('Error executing query:', queryErr);
        //       res.json({error: queryErr.message})
        //     } else {
        //       console.log('Query result:', results);
        //         res.json(results)
        //     }
        //   });
        // });
        res.json(userData);
    }catch(err){
        console.log(err.message);
    }
})
app.listen(port,()=>{
    console.log("Server running on port -> ", port);
})
