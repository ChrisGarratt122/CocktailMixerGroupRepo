$(function(){
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
          var printArray = data.drinks;

          var text = "";
          var name = "";
          var counter = 0;
          var tempStr = "";

          $.each(printArray, function(index, val) {
            console.log(printArray[index]);
            name  = printArray[index];
            console.log("Name: " + name);
            console.log("Counter =" + counter);
            //If array tries to append undefined item from JSON
            // if (printArray[index] === undefined) {
            //   return true;
            // }

            if (index === (length - 1) && index != 0) {
                tempStr = "</div>";
                text += tempStr;
                console.log("Appending final row end.");
            } else {
              if (counter == 0) {
                jsondata = "";
                tempStr = "";
                //tempStr = appendCocktailRowStart(text);
                tempStr = "<div class=\"row text-center\">";
                console.log("Appending row start div.");
                tempStr += appendCocktailBox(name);
                //console.log("temporary STRING: " + tempStr);
                text += tempStr;
              } else if (counter == 2) {
                tempStr = "";
                tempStr = appendCocktailBox(name);
                tempStr = "</div>";
                console.log("Appending row end div.");
                //tempStr = appendCocktailRowEnd(text);
                counter = -1;
                //console.log("temporary STRING: " + tempStr);
                text += tempStr;
              } else {
                tempStr = "";
                tempStr = appendCocktailBox(name);
                //console.log("temporary STRING: " + tempStr);
                text += tempStr;
              }
              //Print all text freezes chrome
              //console.log(text);
              counter = counter + 1;
            }
            console.log("About to append full html string.");
            $("#bordercontainer").append(text);
          });




      }
      else {
        console.log("no data");
      }
    }
  });

});

function appendCocktailBox(name) {
  console.log("Name: " + name);
  console.log("appendCocktailBox entered.");
  var searchName = "";
  searchName = name.replace(/\s+/g, '_');
  console.log(searchName);
  searchName = searchName.replace(/'/g, '');
  var myUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName;
  console.log("Url: " + myUrl)

  //var string = text;
  var string ="";
  //Using ajax call to not be asynchronous
  $.ajax({
  url: myUrl,
  dataType: 'json',
  async: false,
  //data: data,
  success: function(data) {
    console.log("jsondata = " + data);

    var image = data.drinks[0].strDrinkThumb;
    var desc = data.drinks[0].strInstructions;
    console.log("Image: " + image);
    console.log("Desc: " + desc);

    string += "<div id=\"" + name + "\" class=\"col-sm myCocktailBackground\">";
    //string += "<div class=\"home-image\">";
    string += "<img src=\"" + image + "\" alt=\"Picture of " + name + "\" class=\"img-thumbnail\">";
    string += "<div class=\"overlay-test\">";
    //string += "<a href=\"\" class=\"icon\">";
    //string += "<i class=\"fas fa-plus\"></i>";
    //string += "</a>";
    //string += "</div>";
    //string += "</div>";
    string += "<h3>" + name + "</h3>";
    string += "<p>" + desc + "</p>";
    string += "</div>";

    // <div class="col-sm myCocktailBackground">
    //   <img src="img/adam&eve.jpg" alt="..." class="img-thumbnail">
    //   <h3>Adam & Eve</h3>
    //   <p>Shake together all the ingredients and strain into a cold glass.</p>
    // </div>



    //console.log("HTMLstring: " + string);
    //text += string;
    //return string;
  }
  });
  return string;
}
