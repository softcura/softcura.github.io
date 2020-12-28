//const chalk = require('chalk');
const request = require('postman-request');


const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmFycnkxOTgyIiwiYSI6ImNrZ3F6a2lhNjJheWszMW5hMHlyYTZiNG0ifQ.bVtuaKfEXbWrVa7qULJzsA&limit=1';

    request({url, json: true}, (error, {body}={})=>{
        if(error){
           // console.log(body);
            callback('You have no connection to the service!', undefined);
        } else if(body.features === {} || body.features === undefined){
            callback('The query you provided, cannot be found. Please adjust you query.', undefined);
        }else{
           callback(undefined, {
               location: body.features[0].place_name,
               latitude: body.features[0].center[1],
               longtitude: body.features[0].center[0]
           });
        }
    });
}
module.exports = geocode;
