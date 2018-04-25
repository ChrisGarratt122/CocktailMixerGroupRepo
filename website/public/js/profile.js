$(function(){
  $.ajax({
    type: 'GET',
    url: '/saveddrinks',
    dataType: "json",
    cache: false,
    contentType: "application/json",
    success: function(data) {
      if (data) {
        console.log("Username: " + data.login.username);
        console.log("E-mail: " + data.email);
        console.log("[MAKE SURE THIS IS DELETED] Password: " + data.login.password);
        var uname = data.login.username;
        var email = data.email;
        var password = data.login.password;

        console.log("Appending to form");
        $("#inputEmail").append(text);
        $("#inputName").append(text);
        $("#inputPassword").append(text);
        $("#inputConPassword").append(text);

      }
      else {
        console.log("No data");
      }
    }
  });
});
