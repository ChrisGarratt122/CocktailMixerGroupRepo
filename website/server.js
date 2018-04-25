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
  console.log(sess.username);
  var uname = sess.username;
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

app.get('/saveddrinks', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //get the requested user based on their username, eg /profile?username=dioreticllama
  console.log(sess.username);
  var uname = sess.username;
  //this query finds the first document in the array with that username.
  //Because the username value sits in the login section of the user data we use login.username
  db.collection('users').findOne({
    "login.username": uname
  }, function(err, result) {
    if (err) {res.send(err)}
    console.log(uname + ":" + result);
    //finally we just send the result to the user page as "user"
    res.send(result);
  });
});

app.get('/getloggedin', function(req, res) {
  var result ="";
  var resultjson = "";
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){
    result = "false";
  }
  else{
    result = "true";
  }
  resultjson = { "result":result };
  res.send(JSON.stringify(resultjson));
});

app.get('/login', function(req, res) {
  res.render('pages/login');
});

app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  res.render('pages/login');
});

app.get('/profile', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  res.render('pages/profile');
});

//********** POST ROUTES - Deal with processing data from forms ***************************

//the dologin route detasl with the data from the login screen.
//the post variables, username and password ceom from the form on the login page.
app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;

  if (req.body.username == '' || req.body.password == '') {
    res.render('pages/login', {message: "One of the fields was empty! Please try again."});
    return;
  }

  sess = req.session;

  sess.username = uname;

  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      console.log("There was no result!");
      res.render('pages/login', {message: "No match! Please try again."});
      return
    }
    //if(!result){res.redirect('/login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      console.log("There is a result, and the password matches! Directing to index.");
      req.session.loggedin = true; res.redirect('/')
    }
    //otherwise send them back to login
    else{res.render('pages/login'), {message: "No match! Please try again."}}
    console.log("There was a result, but the password did not match! Re-directing back to login.");
    return;
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
//"email":"admin@admin.com"
//"login": {"username":"admin", "password":"mixerPa$$"}",
//"drinks":[]}

app.post('/docontact', function(req, res) {
    if (req.body.name == '' || req.body.email == '') {
    res.render('pages/contact', {message: "A field was empty! Please try again!"});
  }
});


app.post('/adduser', function(req, res) {
    console.log('Add user route entered.');

  //we create the data string from the form components that have been passed in

  var datatostore = {
  "email":req.body.email,
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

  var cocktail = req.body.field1;

  //db.profiles.update( { "username" : username },{ $push: { "drinks": cocktail } });

  db.collection('users').update(
      { "login.username": sess.username },
      { $push: { "drinks": cocktail } }

  //res.send("Complete.");
  );

});

app.post('/checklogin', function(req,res){
  if(req.session.loggedin){
    res.send('true');
  }
  else {
    res.send('false');
  }
});
