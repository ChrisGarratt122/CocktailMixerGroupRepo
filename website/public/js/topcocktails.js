//Function for page startup
$(function(){
  //alert("document ready");
  //Get Info for first top pick from API
  //Test alert
  alert("Getting 'Mojito' from API")
  //var data1 = getResultFromCocktailDB("Mojito");
  getResultFromCocktailDB("Mojito");
  //Test alert
  alert("Sending data to print function");
  printJSON(data1, "#cocktailDesc1");
});

//Function gets data from theCocktailDB API
function getResultFromCocktailDB(searchterms) {
  //Test alert telling that function has been entered
  alert("getResultFromCocktailDB entered");
  //call cocktail API using Ajax
  //build url for the request
  var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchterms;
  //Test alert to display url variable
  alert("Url built: " + url);
  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //Test alert to show getJSON function has been entered
    alert("getJson function has been entered");
    //handle the results
    var target = "#cocktailDesc1";
    printJSON(jsondata, target);
  });
}

function printJSON(jsondata, target){
  //Test alert telling that function has been entered
  alert("printJSON entered");

  //prints the JSON to the screen
  //var normal = JSON.stringify(jsondata);
  var pretty = JSON.stringify(jsondata, null, 4);
  //$(target).append("<p>" + normal + "</p>");
  $(target).append("<pre>" + pretty + "</pre>");

  //Test alert telling that stringify has happened
  alert("Stringify has happened.");
}
