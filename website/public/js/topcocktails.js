//Function for page startup
$(function(){
  //alert("document ready");

  //Get Info for first top pick from API

  //Test alert
  //alert("Getting 'Mojito' from API")

  getResultFromCocktailDB("Mojito", "1");
  getResultFromCocktailDB("Margarita", "2");
  getResultFromCocktailDB("Black_Russian", "3");
  getResultFromCocktailDB("Black_Forest_Shake", "4");

});

//Function gets data from theCocktailDB API
function getResultFromCocktailDB(searchterms, targetno) {
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

    //Send jsondata and target number to printing function
    printDescription(jsondata, targetno);
  });
}

function printDescription(jsondata, targetno){
  //Test alert telling that function has been entered
  //alert("PrintDescription has been entered.");

  //Creating strings to hold HTML code (from API) that will be injected.
  var namestring = "";
  var imgstring = "";
  var descstring = "";

  //Test alert to show for has been entered
  //alert("desc about to be created");

  //Searching jsondata for relevant data and creating corresponding variables to hold it
  var name = jsondata.drinks[0].strDrink;
  var image = jsondata.drinks[0].strDrinkThumb;
  var desc = jsondata.drinks[0].strInstructions;

  //Creating string from returned data
  namestring += name;
  imgstring += image;
  descstring += desc;


  //Test alert to display descstring
  //alert("namecstring= " + namestring);
  //alert("imgstring= " + imgstring);
  //alert("descstring= " + descstring);

  //Test alert to display target number
  //alert("Target number =" + targetno);

  //Constructing targets to hold ID's of the elements to be altered in the HTML
  var nametarget = "#cocktailName" + targetno;
  var imgtarget = "#cocktailImg" + targetno;
  var desctarget = "#cocktailDesc" + targetno;

  //Append namestring to desc box
  $(nametarget).append(namestring);
  //Append image to image box
  $(imgtarget).attr("src", imgstring);
  //Append description to desc box
  $(desctarget).append(descstring);

}
