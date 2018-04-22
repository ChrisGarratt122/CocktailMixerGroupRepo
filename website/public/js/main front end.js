
  $( document ).ready(function() {

    $('#toggle').click(function() {
       $(this).toggleClass('active');
       $('#overlay').toggleClass('open');
      });


    $('body').addClass('animated fadeIn');

    $( "nav li a" ).on( "click", function() {
        $('body').addClass('animated fadeOut');
    });

    $( ".home-image" ).on( "click", function() {
      $(".image-overlay").fadeIn(1000).queue(function(n) {
        $(this).fadeOut(1000); n();
      });
    });

    $('.overlay-test i').click(function (event) {
    event.preventDefault();
    // or use return false;
  });
});
