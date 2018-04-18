/**
 * @Author: Christopher Garratt <chris>
 * @Date:
 * @Filename: server.js
 * @Last modified by: chris
 * @Last modified time: 18-Apr-2018
 */

const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/profiles";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();

// var express = require('express');
// var session = require('express-session');
// var app = express();

//Telling express to use the public folder.
app.use(express.static('public'))

//Setting View Engine to ejs
app.set('view engine', 'ejs');

//Telling express we are using sessions.
app.use(session({ secret: 'example' }));

//Comment to push

app.use(bodyParser.urlencoded({
  extended: true
}));

var db;

//Setting connection to database, setting db var as database.
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening on 8080');
});

//******GET ROUTES (Displaying Pages)*******
app.get('/', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //Otherwise if user is logged in, direct them to index page.
  res.render('pages/index');
});

app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

app.get('/topcocktails', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //Otherwise if user is logged in, direct them to top cocktails page.
  res.render('pages/topCocktails');
});

app.get('/mycocktails', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //Otherwise if user is logged in, direct them to my cocktails page.
  res.render('pages/myCocktails');
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

//*******Telling server to listen on port 8080*****
//app.listen(8080);

//********** POST ROUTES - Deal with processing data from forms ***************************

//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.
app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;

  db.collection('people').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){res.redirect('/login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){ req.session.loggedin = true; res.redirect('/') }
    //otherwise send them back to login
    else{res.redirect('/login')}
  });
});

//the delete route deals with user deletion based on entering a username
app.post('/delete', function(req, res) {
  //check we are logged in.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //if so get the username variable
  var uname = req.body.username;

  //check for the username added in the form, if one exists then you can delete that doccument
  db.collection('people').deleteOne({"login.username":uname}, function(err, result) {
    if (err) throw err;
    //when complete redirect to the index
    res.redirect('/');
  });
});

//the adduser route deals with adding a new user
//dataformat for storing new users.

//{"_id":1,
//"username":"admin",
//"password":"mixerPa$$"",
//"drinks":[]}

app.post('/adduser', function(req, res) {
  //check we are logged in
  if(!req.session.loggedin){res.redirect('/login');return;}

  //we create the data string from the form components that have been passed in

var datatostore = {
"username":req.body.username,
"password":req.body.password,
"drinks":req.body.drinks}


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('accounts').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/')
  })
});
