//const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

// var express = require('express');
// var session = require('express-session');
// var app = express();

//Setting View Engine to ejs
app.set('view engine', 'ejs');

//******GET ROUTES (Displaying Pages)*******
app.get('/', function(req, res) {
  res.render('pages/index');
});

app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

app.get('/topcocktails', function(req, res) {
  res.render('pages/topCocktails');
});

app.get('/mycocktails', function(req, res) {
  res.render('pages/myCocktails');
});

//*******Telling server to listen on port 8080*****
app.listen(8080);



// var express = require('express');
// var app = express();
//var oneLinerJoke = require('one-liner-joke');

// app.get('/', function(req, res){
// res.send("Hello world! by express");
// });
// app.get('/test', function(req, res){
//  res.send("this is route 2");
// });
// app.get('/joke', function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/html'});
//    var randomJoke = oneLinerJoke.getRandomJoke();
//    res.end(randomJoke.body);
// });
// app.get('/getform', function(req, res){
// var name = req.query.name;
// var quest = req.query.quest;
//  res.send("Hi "+name+" I am sure you will "+quest) ;
// });
//     res.send(String(result));
// })
// app.use(express.static('public'))
// app.listen(8080);
