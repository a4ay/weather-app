const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.MAPBOX_SECRET;

function geocode(address){

    return new Promise(async (resolve,reject)=>{
        try{

            const {data} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`);
            
            if (data.features.length === 0){
                reject('Unable to find location. Try another search.')
            }else{
                resolve({
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    location: data.features[0].place_name
                });
            }
        }catch(error){
            reject('Unable to connect to location services!');
        }
        
    })
}

module.exports = geocode;