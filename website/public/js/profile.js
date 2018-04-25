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

        var uname = data.login.username;
        var email = data.email;
        var password = data.login.password;

        console.log("Appending to form");
        $("#inputEmail").attr("placeholder", email);
        $("#inputName").attr("placeholder", (uname + " - You cannot change your username!"));
        $("#inputPassword").attr("placeholder", password);
        $("#inputConPassword").attr("placeholder", password);

      }
      else {
        console.log("No data");
      }
    }
  });
});
