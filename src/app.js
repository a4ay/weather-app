const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

const viewsDir = path.join('__dirname','../templates/views');
const publicDir = path.join('__dirname','../public');
const partialsDir = path.join('__dirname','../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Azay Pdn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Azay Pdn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Azay Pdn'
    })
})

app.get('/weather',async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    try{

        const {latitude,longitude,location} = await geocode(req.query.address);
        const forecastData = await forecast(latitude,longitude);

        res.send({
            forecast : forecastData,
            location,
            address : req.query.address,
        })

    }catch(error){
        res.send({error});
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Azay Pdn',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Azay Pdn',
        errorMessage: 'Page not found.'
    })
})



app.listen(3000,()=>{
    console.log('listening');
})
