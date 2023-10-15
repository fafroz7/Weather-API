const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.sendFile(__dirname+"/index.html");
});

  app.post("/", function(req, res){
  const query = req.body.cityName ;
  const apiKey= "583c9378f8a43318734ccb6fe1b7e5b0";
  const unit= "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+"&units="+unit;
   https.get(url, function(response){
     console.log(response.statusCode);-

       response.on("data", function(data){
       const weatherdata= JSON.parse(data);
       const temp = weatherdata.main.temp;
       const weatherDescription = weatherdata.weather[0].description;
       //const icon = weatherdata.weather[0].icon;
       const imageurl = "https://openweathermap.org/img/wn/10d@2x.png";
       res.write("The weather in "+query+" is "+temp +" degrees celcius");
       res.write("<img src=" + imageurl +">");
       res.send();


   });
});


})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.")
});
