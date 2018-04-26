$(function(){
  //AJAX GET to retrieve drinks array of user from Node.js
  //Do not want drinks, but this route also returns full details of user
  $.ajax({
    type: 'GET',
    url: '/saveddrinks',
    dataType: "json",
    cache: false,
    contentType: "application/json",
    success: function(data) {
      //On success
      if (data) {
        //If data is present, log username and email of user
        console.log("Username: " + data.login.username);
        console.log("E-mail: " + data.email);

        //Assign username, email, password to variables
        var uname = data.login.username;
        var email = data.email;
        var password = data.login.password;

        //Log showing append
        console.log("Appending to form");
        //Add existing credentials to placeholders on profile form
        $("#inputEmail").attr("placeholder", email);
        $("#inputName").attr("placeholder", (uname + " (Cannot change)"));
        $("#inputPassword").attr("placeholder", password);
        $("#inputConPassword").attr("placeholder", password);

      }
      else {
        //Else lof there's no data present
        console.log("No data");
      }
    }
  });
});
