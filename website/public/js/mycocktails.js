$(function(){
  //On page load up
  //Use ajax to find logged in user and retrieve relevant drinks array on node server
  $.ajax({
    type: 'GET',
    url: '/saveddrinks',
    dataType: "json",
    cache: false,
    contentType: "application/json",
    success: function(data) {
      if (data) {
        // Logging data
          console.log(data);
          console.log(data.drinks);
          //Create variable to hold array f drinks
          var printArray = data.drinks;

          //Create variables to gold html string, name of drink, counter, temp string, length fo array
          var text = "";
          var name = "";
          var counter = 0;
          var tempStr = "";
          var length = printArray.length;

          //Jquery for each in array do function
          $.each(printArray, function(index, val) {
            //Log current drink in array
            console.log(printArray[index]);
            //Assign to variable
            name  = printArray[index];
            //Log variable
            console.log("Name: " + name);
            //Log counter
            console.log("Counter = " + counter);
            //If first dirnk in block of four
            if (counter == 0) {
              //Append row start to text, log
              console.log("APPEND : Row start");
              text+= "<div class=\"row text-center\">";
            }
            //Always append Cocktail box to temp then full string, log
            console.log("APPEND : CocktailBox");
            tempStr = appendCocktailBox(name);
            text += tempStr;

            //If last in array, append final row end, og
            if (index === (length - 1) && index != 0) {
                text+= "</div>"
                console.log("Counter - Appending final row end.");
            }
            //Else if last in block, append row end
            else if (counter == 3) {
              console.log("APPEND : Row end");
              text+= "</div>";
              //Reset counter
              counter = -1;
            }
            //Increment counter
            counter = counter + 1;

          });
          console.log("About to append full html string.");
          //Append text to div with my cocktails class
          $(".myCocktails").append(text);
      }
      else {
        //Else log there's no data
        console.log("no data");
      }
    }
  });

});


function appendCocktailBox(name) {
  //Append name of passed cocktail
  console.log("Name: " + name);
  console.log("appendCocktailBox entered.");
  //Create var to hold name to search
  var searchName = "";
  searchName = name;
  //Create var to hold url
  var myUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName;
  //Log url
  console.log("Url: " + myUrl)
  //Create variable to hold nice looking display name, replace underlines
  displayName = name.split('_').join(' ');
  //If name to display is too long, shorten and end with dots
  if (displayName.length > 15) {
    console.log("SUBSTRING ENTERED")
    displayName = displayName.substring(0, 15);
    displayName = displayName.concat('...');
  }
  //Create variable to hold string
  var string ="";
  //Usse AJAX call to return infor of cocktail from api
  $.ajax({
  url: myUrl,
  dataType: 'json',
  async: false,
  //data: data,
  success: function(data) {
    //Log json
    console.log("jsondata = " + data);

    //Create var to hold image and desc of cocktail from api json
    var image = data.drinks[0].strDrinkThumb;
    var desc = data.drinks[0].strInstructions;
    //Log these variables
    console.log("Image: " + image);
    console.log("Desc: " + desc);

    //Build cocktaildisplay element
    string += "<div id=\"" + displayName + "\" class=\"col-sm myCocktailBackground\">";
    string += "<img src=\"" + image + "\" alt=\"Picture of " + displayName + "\" class=\"img-thumbnail\">";
    string += "<h3>" + displayName + "</h3>";
    string += "<p>" + desc + "</p>";
    string += "</div>";

  }
  });
  //Return string with element
  return string;
}
