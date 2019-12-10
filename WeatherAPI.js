const request = require('request');

let apiKey = "e39c5eea5885613eaabe5d2d70b9c5af";

let city = "Gummersbach";

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body);

    let message = `It's ${weather.main.temp} degrees in
    ${weather.name}!`;
    console.log(message);
  }
});





