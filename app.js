const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html");
  })

  app.post("/", function(req , res){

  const query =  req.body.cityName;
  const apiKey = "14e9549e4e3ba14bcacb3f9faa815f3c"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey  +"&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData =  JSON.parse(data)
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].weatherDescription;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"

    res.write("<p><h2>The weather is currently  " + weatherDescription + "<h2></p>");
    res.write("<h1>The temperature in "+ query + " is " + temp + " degree celcius.</h1>");
    res.write("<img src=" +  imageURL + ">")
    res.send()
    })
  })

  })


    // const query =  "london"
    // const apiKey = "14e9549e4e3ba14bcacb3f9faa815f3c"
    // const unit = "metric"
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey  +"&units=" + unit;
    // https.get(url, function(response){
    //   console.log(response.statusCode);
    //
    //   response.on("data", function(data){
    //   const weatherData =  JSON.parse(data)
    //   const temp = weatherData.main.temp
    //   const weatherDescription = weatherData.weather[0].weatherDescription
    //   const icon = weatherData.weather[0].icon
    //   const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
    //
    //   res.write("<p><h2>The weather is currently  " + weatherDescription + "<h2></p>");
    //   res.write("<h1>The temperature in London  is "+ temp + " degree celcius.</h1>");
    //   res.write("<img src=" +  imageURL + ">")
    //   res.send()
    //   })
    // })

app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
