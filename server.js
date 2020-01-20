require('dotenv').config()
const express = require('express')
const app = express()
const request = require('request')

const key = process.env.apiKey;

// chama express no root
app.get('/', function (req, res){
    res.render('index', {weather: null, error: null});
})


// inicia ejs

app.set('view engine', 'ejs')
//seta o folder public

app.use(express.static('public'))


app.use(express.json());
app.use(express.urlencoded({extended: true}));


// seta a rota post

app.post('/', function(req, res){
    let cidade = req.body.cidade;
    app.locals.weather = '';
    app.locals.error = '';
    let url =  `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${key}`;
    request(url, function(err, response, body){
        if(err){
            res.render('index', {weather: null, error: 'Erro, por favor tente novamente'});
        }else{
            let weather = JSON.parse(body)
            if(weather.main === undefined){
                res.render('index', {weather: null, error: 'Erro, tente novamente'});
            }else{
                let weatherText = `A temperatura atual é ${weather.main.temp} celsius em ${weather.name}`
                res.render('index', {weather: weatherText, erro: null});
            }
        }
    })
})

// abre porta para ouvir
app.listen(3000, function() {
    console.log('Listening on port 3000')
})