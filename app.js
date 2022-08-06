const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "db4b48ce4cbaaf3243fe32a458efed1d";
  const units = "imperial";
  const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units);

  https.get(url, function(response) {



    //this response.on is the response taking data from our api. while we can use the response function to make request and response asks directly from our backend server, --
    //-- it also happens to be the way we get data from other websites through an API.
    response.on("data", function(data) {
      //  weatherData is the complete access to ALL the data being given by the API
      const weatherData = JSON.parse(data)
      //our const 'temp' is specifically calling the temperature out of the weatherData object
      const temp = weatherData.main.feels_like;
      const descrip = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const weatherIconURL = " http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      res.write("<p> The weather is currently " + descrip + " in " + query + " </p>");
      res.write("<h1>the temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + weatherIconURL + ">")
      res.send();
    });
  });
});




app.listen(3000, function() {
  console.log("server is running on port 3000.");
});
