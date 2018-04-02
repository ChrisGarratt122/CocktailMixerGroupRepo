//Function for page startup
$(function(){
  //alert("document ready");
  //Get Info for first top pick from API
  //Test alert
  alert("Getting 'Mojito from API'")
  alert("Sending data to print function");
  var data1 = getResultFromCoctailDB("Mojito");
  //Test alert
  alert("Sending data to print function");
  printJSON(data1, "#cocktailDesc1");
});

//Function gets data from theCocktailDB API
function getResultFromCocktailDB(searchterms) {
  //call cocktail API using Ajax
  //build url for the request
  var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchterms;
  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //handle the results
    return jsondata;
  });
}

function printJSON(jsondata, target){
  //prints the JSON to the screen
  var normal = JSON.stringify(jsondata);
  $(target).append("<p>" + normal + "</p>");
}
