const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
    
const request=require('request');
const geocode=require('./utils/geocode.js');
const forecast=require('./utils/forecast.js');

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
        title: "weather app",
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
    if(!req.query.address)return res.send({error:"please provide address"})


geocode(req.query.address, (error, {lattitude,longitude,place}={}) => {
    if (error)return res.send({error:error});
    else {
         forecast(lattitude,longitude,(error,{temp})=>{   
        if(error)return res.send({error:error})
        else return res.send({location:place,temperature:temp})
       });
    }
});

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Amit",
        message: 'help article not found '})
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "Amit",
        message: ' Page not found'})
})
app.listen(3000, () => {
    console.log("server is up on port 3000");
});