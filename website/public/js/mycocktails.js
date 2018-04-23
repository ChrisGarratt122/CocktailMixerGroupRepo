$(function(){
  $.ajax({
    type: 'GET',
    url: '/saveddrinks',
    dataType: "json",
    cache: false,
    contentType: "application/json",
    success: function(data) {
      if (data) {
          console.log(data);
      }
      else {
        console.log("no data");
      }
    }
  });

}
