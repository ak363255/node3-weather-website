const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYWszNjMyNTUiLCJhIjoiY2tjamhyMDExMWxxNzJ4bTJ2MGcxZ2w0ZiJ9.Y1NamV8ME1FZDeu7wHhCjg";
    request({url: url, json: true}, (error, response) => {
        if (error)
            callback("unable to connect to the geoservice", undefined);
        else if (response.body.features.length == 0)
            callback("You have enter bad location", undefined);
        else {
            //console.log(response.body);
            callback(undefined, {lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                place: response.body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
        