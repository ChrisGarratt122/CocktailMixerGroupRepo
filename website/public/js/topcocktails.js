//Function for page startup
$(function(){
  //alert("document ready");

  //Get Info for first top pick from API

  //Test alert
  //alert("Getting 'Mojito' from API")

  getResultFromCocktailDB("Mojito");

  //Test alert
  //alert("Sending data to print function");
  
  printJSON(data1, "#cocktailDesc1");
});

//Function gets data from theCocktailDB API
function getResultFromCocktailDB(searchterms) {
  //Test alert telling that function has been entered
  //alert("getResultFromCocktailDB entered");

  //call cocktail API using Ajax
  //build url for the request
  var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchterms;

  //Test alert to display url variable
  //alert("Url built: " + url);

  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //Test alert to show getJSON function has been entered
    //alert("getJson function has been entered");

    //Creating target variable to hold what element end result will be printed in.
    var target = "#cocktailDesc1";
    //Send jsondata and target to printing function
    printDescription(jsondata, target);
  });
}

function printDescription(jsondata, target){
  //Test alert telling that function has been entered
  //alert("PrintDescription has been entered.");

  //Creating string to hold HTML code (Desc from API) that will be injected.
  var descstring = "";

    //Test alert to show for has been entered
    //alert("desc about to be created");

    //Searching jsondata for instructions and creating desc varaible to hold it
    var desc = jsondata.drinks[0].strInstructions;
    descstring += desc;

  //Test alert to display descstring
  //alert("Descstring= " + descstring);

  //Append descstring to desc box
  $(target).append(descstring);
}
