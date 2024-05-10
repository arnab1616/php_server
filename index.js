const express = require('express')
const pool = require('./phpDB.js')
const axios = require('axios')
const cors = require('cors')

const app = express();
const port = 3000;
app.use(cors());
app.get('/', async (req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        params: {
          apikey: '873dbe322aea47f89dcf729dcc8f60e8'
        },
        headers: {
              'X-RapidAPI-Key': 'f5477797a3mshfb6292822327c3bp18707ajsn5075c83ad6e0',
              'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
        }
      };
    try {
        const response = await axios.request(options);
        res.json(response.data);
        console.log(response.data);
  } catch (error) {
    console.error(error);
  }
    // pool.getConnection((err, connection) => {
    //   if (err) {
    //     console.error('Error getting MySQL connection:', err);
    //     return;
    //   }
    
    //   connection.query('SELECT * FROM user', (queryErr, results) => {
    //     connection.release(); // Release the connection back to the pool after use
    
    //     if (queryErr) {
    //       console.error('Error executing query:', queryErr);
    //       res.json({error: queryErr.message})
    //     } else {
    //       console.log('Query result:', results);
    //         res.json(results)
    //     }
    //   });
    // });
})
app.post('/api/save/visitor/location', async (req, res) => {
    try {
        res.json(req.body);
        console.log(req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch geolocation' });
    }
});
app.get('/api/fetch/location', async(req, res)=>{
    const options = {
        method: 'GET',
        url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
        params: {
          apikey: '873dbe322aea47f89dcf729dcc8f60e8'
        },
        headers: {
              'X-RapidAPI-Key': 'f5477797a3mshfb6292822327c3bp18707ajsn5075c83ad6e0',
              'X-RapidAPI-Host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com'
        }
      };
    try{
        const response = await axios.request(options);
        // res.json(response.data);
        const userData = response.data;
        console.log(response.data);
        // const response = await fetch('https://api.ipify.org?format=json');
        // const data = await response.json();
        // const response1 = await fetch(`https://ipapi.co/${data.ip}/json/`);
        // const userData = await response1.json();
        console.log(userData);
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Error getting MySQL connection:', err);
            return;
          }
        
          connection.query(`INSERT INTO user_geolocation (ip_address,network,city,region,country,postal_code,latitude,longitude) VALUES('${userData.ip}','${userData.network}','${userData.city}','${userData.state}','${userData.country}','${userData.zipCode}','${userData.latitude}','${userData.longitude}')`, (queryErr, results) => {
            connection.release(); 
        
            if (queryErr) {
              console.error('Error executing query:', queryErr);
              res.json({error: queryErr.message})
            } else {
              console.log('Query result:', results);
                res.json(results)
            }
          });
        });
        // res.json(userData);
    }catch(err){
        console.log(err.message);
    }
})
app.listen(port,()=>{
    console.log("Server running on port -> ", port);
})
