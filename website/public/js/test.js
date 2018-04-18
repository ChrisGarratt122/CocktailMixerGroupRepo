$(function(){
  //Append log to console about document being ready (Entered js)
  console.log("Document Ready");

  //Append log about entering function tog et api list, enter function
  console.log("About to enter getIngredientsFromCocktailDB()");
  getIngredientsFromCocktailDB();

});

function getDrinksFromCocktailDB() {

    var ingredientArray = getArray();

    console.log("Ingredient Array : " + ingredientArray);

    var searchterms = "";
    var url = "";
    var currentArray = [];
    var oldArray = [];
    var printArray = [];

    console.log("getDrinksFromCocktailDB() entered.")
    var ingredientArray = [];
    ingredientArray = getArray();
    console.log("Got array from getArray().");
    console.log(ingredientArray);

    console.log("About to enter for loop for every ingredient.");
    console.log("Ingredient Array length : " + ingredientArray.length);
    var length = ingredientArray.length;
    console.log("Before for length is: " + length);
    var count =  ingredientArray.length;
    $.each( ingredientArray, function( i, value ) {
        console.log("Beginning of loop, i is: " + count);
        console.log("Beginning of loop, length is:" + length);
        //oldArray = printArray;
        //Build url to get json
        searchterms = ingredientArray[count].replace(/\s+/g, '_');
        searchterms = searchterms.replace(/'/g, '');
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchterms;
        console.log(url);
        //Get json array using url
        //****Gets to here, skips out of for****//
        console.log("1." + count);
        $.getJSON(url, function(jsondata) {
            console.log("2." + count);
            console.log("jsondata returned");
            //Create array of drinks from jsondata
            currentArray = $.map(jsondata.drinks, function (el) {
            return el.strDrink;
            });
            console.log("3." + count);
            console.log("Array made from JSON data: " + currentArray);

            if (i === 0) {
              printArray = currentArray;
            }
            else {
              var index = $.inArray( value, printArray );
              //If index is not -1, it is in the array. Push into new print array.
              if( index != -1 ) {
                console.log( "Index does not equal negative one: " + index );
                printArray.push(currentArray[index]);
                console.log("Just pushed:" + currentArray[index]);
              }
            }
        });
        if (i === count) {
          console.log("Going to displayCocktails()");
          console.log("Current PrintArray: " + printArray);
          //displayCocktails(printArray);
        }
    });

function displayCocktails(array) {
  console.log("Entered displayCocktails")
  //Basic test version
  var text = "";
  var name = "";
  var counter = 0;
  array.length = 11;
  var length = array.length;
  var tempStr = "";
  $.each(array, function(index, val) {
    console.log(array[index]);
    name  = array[index];

    if (index === (length - 1)) {
        tempStr = "";
        tempStr += appendCocktailRowEnd(text);

    } else {
      if (counter == 0) {
        tempStr = "";
        tempStr += appendCocktailRowStart(text);
        tempStr += appendCocktailBox(text, name);
        console.log("TEMP STRING: " + tempStr);
        text += tempStr;
      } else if (counter == 2) {
        tempStr = "";
        tempStr += appendCocktailBox(text, name);
        tempStr += appendCocktailRowEnd(text);
        counter = -1;
        console.log("TEMP STRING: " + tempStr);
        text += tempStr;
      } else {
        tempStr = "";
        tempStr += appendCocktailBox(text, name);
        console.log("TEMP STRING: " + tempStr);
        text += tempStr;
      }
      //Print all text freezes chrome
      //console.log(text);
      counter = counter + 1;
    }
  });
  console.log(text);
  console.log("About to append full html string.");
  $("#bordercontainer").append(text);
}

function appendCocktailRowStart(text) {

  var string = "";
  console.log("appendCocktailRowStart entered.");
  string += '<div class=\"row text-center\">';
  console.log("HTMLstring: " + string);
  text += string;

  return text;

}

function appendCocktailBox(text, name) {

  var string = "";
  console.log("appendCocktailBox entered.");
  var searchName = "";
  searchName = name.replace(/\s+/g, '_');
  searchName = searchName.replace(/'/g, '');
  var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName;
  console.log("Url: " + url)
  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    var image = jsondata.drinks[0].strDrinkThumb;
    var desc = jsondata.drinks[0].strInstructions;
    console.log("Image: " + image);
    console.log("Desc: " + desc);



    string += "<div class=\"col-sm\">";
    string += "<img src=\"" + image + "\" alt=\"Picture of " + name + "\" class=\"img-thumbnail\">";
    string += "<h3>" + name + "</h3>";
    string += "<p>" + desc + "</p>";
    string += "</div>";
    console.log("HTMLstring: " + string);
    text += string;
    return text;
  });

}

function appendCocktailRowEnd(text) {

  var string = "";
  console.log("appendCocktailRowEnd entered.");
  string += "</div>";
  console.log("HTMLstring: " + string);
  text += string;
  return text;

}
