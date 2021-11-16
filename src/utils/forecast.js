const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.WEATHERSTACK_SECRET;

function forecast(latitude,longitude){
    return new Promise(async (resolve,reject)=>{

        try{

            const {data} = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}&units=m`);
            
            if(data.error){
                reject('Unable to find location');
            }else{
                resolve( data.current.weather_descriptions[0] + '. It is currently ' + data.current.temperature + ' degress out. It feels like ' + data.current.feelslike + ' degrees out.');
            }
        }catch(error){
            reject('Unable to connect to weather service!');
        }

    })
}

module.exports = forecast;