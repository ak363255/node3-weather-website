const path = require('path')
const express= require('express');
const hbs = require('hbs');
const app = express();
const port=process.env.PORT||3000;
const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//define path for express
const public_dir_path = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partial')
//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
//setup static directory to serve
app.use(express.static(public_dir_path))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Amit"
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amit'

    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Amit"
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send({error: "Please provide address"})


    geocode(req.query.address, (error, {lattitude, longitude, place} = {}) => {
        if (error)
            return res.send({error: error});
        else {
            forecast(lattitude, longitude, (error, {temp,temp_min,temp_max,description}) => {
                if (error)
                    return res.send({error: error})
                else
                    
                {
                   console.log(description+" des is ");
                    return res.send({location: place, temperature: temp,temp_min:temp_min,temp_max:temp_max,description:description})
                }
            });
    }
    });

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Amit",
        message: 'Help article not found '})
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Amit",
        message: ' Page not found'})
})
app.listen(port, () => {
    console.log("server is up on port "+port);
});