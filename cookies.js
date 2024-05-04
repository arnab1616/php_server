var mysql = require('mysql');
var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:null,
  database:"arnabdb"
})
connection.connect(function(err){
  if(err){
    console.log(err.code)
    console.log(err.fatal)
  }
})
$query = 'SELECT * FROM xyz';
connection.query($query, function(err, rows, fields){
  if(err){
    console.log("An error ocoure");
    return;
  }
  console.log("Qurey succesfull! ", rows);
})

connection.end(function(){
  console.log("Connection closed");
})
async function fetchIpAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP address:', error);
      return null;
    }
  }
  
  async function getGeolocation(ip) {
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
      };
    } catch (error) {
      console.error('Error fetching geolocation:', error);
      return null;
    }
  }
  
  async function fetchUserLocation() {
    const ipAddress = await fetchIpAddress();
    if (ipAddress) {
      const locationData = await getGeolocation(ipAddress);
      console.log('User Location:', locationData);
  
      // document.cookie = `userLocation=${JSON.stringify(locationData)};expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()};path=/`;

    } else {
      console.log('Failed to fetch IP address.');
    }
  }
  
  fetchUserLocation();
  