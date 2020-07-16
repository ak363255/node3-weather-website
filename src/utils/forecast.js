const request = require('request');
const forecast = (lattitude, longitude, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=metric&appid=af5294c6f336e4e12540d626d6bebe0f";
    request({url: url, json: true}, (error, response) => {
        if (error)
            callback("unable to connect to geoservice", undefined);
        else if (response.body.error || response.body.cod == '400')
            callback("Unable to find location", undefined);
        else {
            console.log("min temp is "+response);
            
            callback(undefined, {temp: response.body.current.temp,            
                                 temp_min:response.body.daily[0].temp.min,
                                 temp_max:response.body.daily[0].temp.max
            });
        }
    });
}
module.exports = forecast;
