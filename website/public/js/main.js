$(function(){
  //On page load up
  //Jquery on nav bar toggle click
  $('#toggle').click(function() {
      //Make nav bar and overlay visible and interactable
     $(this).toggleClass('active');
     $('#overlay').toggleClass('open');
    });

    //Ajax GET call to check log in state
    $.ajax({
      type: 'GET',
      url: '/getloggedin',
      dataType: "json",
      cache: false,
      contentType: "application/json",
      success: function(data) {
        //On success
        if (data) {
          //If data is present
          //Log it
          console.log(data)

          //If data has returne true, user is logged in and logout/Profile
          //Should replace Login and Sign up in nav bar
          if (data.result === "true") {
            //Replace Login with Logout using jquery
            $("#leftlink").text("Logout");
            $("#leftlink").attr("href", "/logout");

            //Replace Sign up with Profile using jquery
            $("#rightlink").text("Profile");
            $("#rightlink").attr("href", "/profile");
          }
        }
        else {
          //Log Data is not present
          console.log("no data");
        }
      }
    });
});

//Add fade in for home image
$( ".home-image" ).on( "click", function() {
  $(".image-overlay").fadeIn(1000).queue(function(n) {
    $(this).fadeOut(1000); n();
  });
});

//Prevent link for overlay click
$('.overlay-test i').click(function (event) {
event.preventDefault();
// or use return false;
});
