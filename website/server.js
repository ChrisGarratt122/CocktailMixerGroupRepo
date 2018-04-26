/**
 * @Author: Christopher Garratt <chris>
 * @Date:
 * @Filename: server.js
 * @Last modified by: chris
 * @Last modified time: 18-Apr-2018
 */

const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/profiles"; //Url for mongo db connection
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express(); //Variable to initialize express

//Telling express to use the public folder.
app.use(express.static('public'))

//Setting View Engine to ejs
app.set('view engine', 'ejs');

//Telling express we are using sessions.
app.use(session({ secret: 'example' }));

//Tell express to use json bodyparser
app.use(bodyParser.json());

//Tell expressto user urlencoed bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));

//Var for database instance
var db;

//Var for session instance
var sess;

//Setting connection to database, setting db var as database.
MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  //Set server to listen on port 8080
  app.listen(8080);
  //Log this
  console.log('listening on 8080');
});

//******GET ROUTES (Displaying Pages)*******

//****Index Get****//
app.get('/', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //Otherwise if user is logged in, direct them to index page.
  res.render('pages/index');
});

//****Contact Page Get****//
app.get('/contact', function(req, res) {
  res.render('pages/contact');
});

//****Top Cocktails Page Get****//
app.get('/topcocktails', function(req, res) {
  //If user is not currently logged in, redirect them to login page.
  if(!req.session.loggedin){res.redirect('/login');return;}
  //Otherwise if user is logged in, direct them to top cocktails page.
  res.render('pages/topCocktails');
});

//****My Cocktails Page Get****//
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

//****Get to return user information (With drinks array)****//
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

//****Get to check if anyone is logged in****//
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

//****Login Page Get****//
app.get('/login', function(req, res) {
  res.render('pages/login');
});

//****Signup Page Get****//
app.get('/signup', function(req, res) {
  res.render('pages/signup');
});

//****Logout Page Get****//
app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  res.render('pages/login');
});

//****Profile Page Get****//
app.get('/profile', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  res.render('pages/profile');
});

//********** POST ROUTES - Deal with processing data from forms ***************************

//****Do Login Post****//
app.post('/dologin', function(req, res) {
  //Log data sent from client
  console.log(JSON.stringify(req.body))
  //Assign username and password from client to variables
  var uname = req.body.username;
  var pword = req.body.password;

  //If username or password are empty, redirect back to login with message
  if (req.body.username == '' || req.body.password == '') {
    res.render('pages/login', {message: "One of the fields was empty! Please try again."});
    return;
  }

  //Set sess var to current session
  sess = req.session;

  //Set session username to uname from client
  sess.username = uname;

  //Search users collection for user account with username sent from client
  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      console.log("There was no result!");
      //Send message for client to display
      res.render('pages/login', {message: "No match! Please try again."});
      return
    }
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      console.log("There is a result, and the password matches! Directing to index.");
      req.session.loggedin = true; res.redirect('/')
    }
    //otherwise send them back to login with message, log to server
    else{res.render('pages/login'), {message: "No match! Please try again."}}
    console.log("There was a result, but the password did not match! Re-directing back to login.");
    return;
  });
});

//****DELETE user Post****//
//the delete route deals with user deletion based on entering a username
app.post('/delete', function(req, res) {
  //Check a user is looged in, if they're not redirect to login
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

//dataformat for storing new users.
//{"_id":1,
//"email":"admin@admin.com"
//"login": {"username":"admin", "password":"mixerPa$$"}",
//"drinks":[]}

//****Do Contact Post****//
app.post('/docontact', function(req, res) {
    //If name or email are empty, send back to contact with message saying so
    if (req.body.name == '' || req.body.email == '') {
    res.render('pages/contact', {message: "A field was empty! Please try again!"});
    return;
   }
    //Else send back to page with message thanking for feedback.
    else {
    res.render('pages/contact', {message: "Thank you for your feedback!"});
    return;
  }
});

//****Add user Post****//
app.post('/adduser', function(req, res) {
  //Log to server that route has been entered
  console.log('Add user route entered.');

  //If name or password is empty, render page again with relevant message
  if (req.body.name == '' || req.body.password == '') {
  res.render('pages/signup', {message: "A field was empty! Please try again!"});
  return;
  }
  //If email is empty, render page again with relevant message
  if (req.body.email == '') {
  res.render('pages/signup', {message: "A field was empty! Please try again!"});
  return;
  }
  //If password fields do not match, render page again with relevant message
  if (req.body.password != req.body.confirmPassword) {
    res.render('pages/signup', {message: "Password fields do not match! Please try again!"});
    return;
  }


  //Create the data string from the form components that have been passed in
  var datatostore = {
  "email":req.body.email,
  "login":{"username":req.body.username,"password":req.body.password},
  "drinks":[]}


  //once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').save(datatostore, function(err, result) {
    if (err) throw err;
    //Log message to server
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/')
  })
});

//****Add drink to user drinks array Post****//
app.post('/adddrink', function(req, res){
  //Log data from request and currently logged in user
	console.log(req.body);
  console.log(req.body.field1);
  console.log(sess.username);

  //Create var to hold field in request (Drink to add to array)
  var cocktail = req.body.field1;

  //Find user in collection with current username, push to drinks array.
  db.collection('users').update(
      { "login.username": sess.username },
      { $push: { "drinks": cocktail } }

  );

});

//****Check Login Post****//
app.post('/checklogin', function(req,res){
  //If someone is logged in send true to client
  if(req.session.loggedin){
    res.send('true');
  }
  //Else send false
  else {
    res.send('false');
  }
});

//****Do Login Post****//
app.post('/updateuser', function(req,res) {

    //Create var to hold string to be sent for message
    var messageString = "";

    //If password fields do not match render page again with relevant message
    if (req.body.conPassword != req.body.password) {
      res.render('pages/profile', {message: "Password fields do not match! Please try again!"});
      return;
    }
    //If password field is not empty
    if (req.body.password != ''){
      //Add password changed to message string
      messageString += "Your password has been changed! ";
      //Set new password for user in database
      db.collection('users').update(
          { "login.username": sess.username },
          { $set: { "login.password": req.body.password } }
        );
    }
    //If email field is not empty
    if (req.body.email != ''){
      //Add email changed to message string
      messageString += "Your email has been changed! ";
      //Set new email for user in database
      db.collection('users').update(
          { "login.username": sess.username },
          { $set: { "email": req.body.email } }
        );
    }
    //*****Experimental code for changing username*****
    // if (req.body.name != ''){
    //   messageString += "Your name has been changed! ";
    //   console.log(req.body.username);
    //   db.collection('users').update(
    //       { "login.username": sess.username },
    //       { $set: { "login.username": req.body.username } }
    //     );
    //     sess.username = req.body.username;
    // }
    //Render profile page again with compiled message string
    res.render('pages/profile', {message: messageString} );
});
