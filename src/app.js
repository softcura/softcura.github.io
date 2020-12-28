const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const hbs = require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); 
app.set('views', viewsPath); 
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Barzin Frozandehfar'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Barzin Frozandehfar'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message: 'In this page, you can get any help you need!',
        name: 'Barzin Frozandehfar'
    })
})
//----------------------------------------------------------------------------------------------

 
app.get('/weather', (req, res)=>{
    
    if(!req.query.address)
    {
       return res.send({
            error: 'you must provide a address!',
        });
    }

     geocode(req.query.address, (error, {latitude, longtitude, location}={})=>{
        if(error) return res.send({error});

            forecast(latitude , longtitude, (error, forecastData) => {
                if(error) return res.send({error});
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    });
            })
    });




    
});




//-------------------------------------------------------------------------------------------------

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 - ERROR',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 - ERROR',
        message: 'Page not found!!!'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port);
});
