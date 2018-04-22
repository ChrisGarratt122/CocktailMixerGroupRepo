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
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

var db;

var sess;

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
  //get the requested user based on their username, eg /profile?username=dioreticllama
  console.log(req.user);
  var uname = req.query.username;
  //this query finds the first document in the array with that username.
  //Because the username value sits in the login section of the user data we use login.username
  db.collection('users').findOne({
    "login.username": uname
  }, function(err, result) {
    if (err) throw err;
    console.log(uname + ":" + result);
    //finally we just send the result to the user page as "user"
    res.render('pages/myCocktails', {
      user: result
    })
  });
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

//********** POST ROUTES - Deal with processing data from forms ***************************

//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.
app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;

  sess = req.session;

  sess.username = uname;

  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      console.log("There was no result!");
      res.redirect('/login');
      return
    }
    //if(!result){res.redirect('/login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      console.log("There is a result, and the password matches! Directing to index.");
      req.session.loggedin = true; res.redirect('/')
    }
    //otherwise send them back to login
    else{res.redirect('/login')}
    console.log("There was a result, but the password did not match! Re-directing back to login.");
  });
});

//the delete route deals with user deletion based on entering a username
app.post('/delete', function(req, res) {
  //check we are logged in.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //if so get the username variable
  var uname = req.body.username;

  //check for the username added in the form, if one exists then you can delete that doccument
  db.collection('users').deleteOne({"username":uname}, function(err, result) {
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
  "login":{"username":req.body.username,"password":req.body.password},
  "drinks":[]}


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').save(datatostore, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/')
  })
});


app.post('/adddrink', function(req, res){
	console.log(req.body);
  console.log(req.body.field1);
  console.log(sess.username);
  var username = post[];
  var cocktail = post['drink'];
    // I checked here that partyId and trackId are valid vars.
    db.profiles.update( { $push: { drinks: [cocktail] } }, function(err, added) {
      if( err || !added ) {
        console.log("Track not added.");
        callback(null,added);
      }
      else {
        console.log("Track added to drink with name: "+ cocktail);
        callback(null,added);
        }
    });

});
