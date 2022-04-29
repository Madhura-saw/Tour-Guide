//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();


const { use } = require("express/lib/application");
const urlencoded = require("body-parser/lib/types/urlencoded");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url = 'mongodb+srv://MansiShingate:Travel%40321@cluster0.2bhoy.mongodb.net/touristPlaces';
mongoose.connect(url, {useNewUrlParser: true});

const placeSchema = new mongoose.Schema({
  name: String,
  image:String,
  type:String,
  desc: String,
  region: String,
  travel: String,
  visit: String,
  accomodation: String,
  places: String,
  speciality: String,
  history: String,
  geography: String,
  things:String,
  climate:String,
  languages:String,
});
const Place = mongoose.model("Place", placeSchema);

app.get("/places", function(req, res){
  
  Place.find({}, function(err, places){
    res.render("places", {
      places:places
      });
  });
});

app.get("/info/:placeName", function(req, res){
    const requestedPlaceId = req.params.placeName;
    Place.findOne({name: requestedPlaceId}, function(err, place){
      res.render("info", {
        name: place.name,
        image:place.image,
        type:place.type,
        desc: place.desc,
        region: place.region,
        travel: place.travel,
        visit: place.visit,
        accomodation: place.accomodation,
        places:place.places,
        speciality: place.speciality,
        history: place.history,
        geography: place.geography,
        things:place.things,
        climate:place.climate,
        languages:place.languages
       
      });
    });
  });


app.get("/", function(req, res){
    res.render("home");
});

app.post("/", function(req, res){
  res.render("home");
});

app.get("/index", function(req, res){
  res.render("index");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/info", function(req, res){
  res.render("info");
});

app.get("/add", function(req, res){
  res.render("add");
});

app.get("/review", function(req, res){
  res.render("review");
});

app.post("/add", function(req, res){
  res.render("review");
});

app.post("/home", function(req, res){
   const searchPlace=req.body.searchplace;
   console.log(searchPlace);
   Place.findOne({name: searchPlace}, function(err, place){
    res.render("info", {
      name: place.name,
      image:place.image,
      type:place.type,
      desc: place.desc,
      region: place.region,
      travel: place.travel,
      visit: place.visit,
      accomodation: place.accomodation,
      places:place.places,
      speciality: place.speciality,
      history: place.history,
      geography: place.geography,
      things:place.things,
      climate:place.climate,
      languages:place.languages
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
    console.log("Server has started succesfully");
});