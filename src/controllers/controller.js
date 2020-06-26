const axios = require('axios')
const Weather = require('../models/Weather')
const API_KEY = "e1105350b5f7ed80f0f67e48a05cf6d9";

exports.renderHomePage = (req, res) => {
    res.render('index')
}

exports.renderAboutPage = (req, res) => {
    res.render('about')
}

exports.getWeather = (req, res) => {
    const city = req.body.city;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const weather = new Weather(req.body.city)
    weather.validateUserInput()

    if(weather.errors.length) {
        res.render('index', {
            error: weather.errors.toString()
        })
    } else {
        axios.get(url).then( (response) => {
            const { temp } = response.data.main
            const { name } = response.data
            res.render('index', {
                weather: `It is currently ${temp} in ${name}`
            })
        }).catch( (error) => console.log(error))
    }
}