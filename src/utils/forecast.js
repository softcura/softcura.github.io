const request = require('postman-request');
//const chalk = require('chalk');
//console.clear();  // is to clear the CLI screen before starting the code here-under.

const forecast = (latitude, longtitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=533ed5cbc0c2163acfd739d29bbae378&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longtitude);

    request({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Connection seems to be a problem for communication failing towards weather services!', undefined);
        } else if(body.error){
            callback(body.error.info, undefined);
        } else{
            callback(undefined, 
            `Today's weather is: ${body.current.weather_descriptions}.`+'\n'+
            `It is currently: ${body.current.temperature} degrees,` + '\n'+
            `but it feels like: ${body.current.feelslike} degrees.` + '\n'+
            `Todays humidity is: ${body.current.humidity}%.` + '\n'+
            `There is a ${body.current.precip}% chanse of rain.`
            )
        }
    })
}

module.exports = forecast;