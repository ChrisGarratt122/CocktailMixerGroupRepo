$(function(){

  //Append log to console about document being ready (Entered js)
  console.log("Document Ready");

  //Append log about entering function tog et api list, enter function
  console.log("About to enter getIngredientsFromCocktailDB()");
  getIngredientsFromCocktailDB();

});

//Function gets data from theCocktailDB API
function getIngredientsFromCocktailDB() {
  //Append log to console that function has been entered
  console.log("getResultFromCocktailDB entered");

  //call cocktail API using Ajax
  //build url for the request
  var url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"

  //Append new url variable log to console
  console.log("Url: " + url);

  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //Append console log about entering buildArray function, call function and pass json
    console.log("About to enter buildArray() function.");
    //Test console log, see what jsondata looks like
    console.log(jsondata);
    buildArray(jsondata);
  });
}

function buildArray(jsondata) {
  //Append log to console detailing entry into function
  console.log("Entered buildArray() function.");

  //Make array from json data
  var array = $.map(jsondata.drinks, function (el) {
  return el.strIngredient1;
  });

  console.log(array); // see the output here

  //Append console log about entering displayArray function, call function and pass json
  console.log("About to enter displayArray() function.");
  displayArray(array);
}

function displayArray(array) {

  //******Building and displaying ingredients from API in dropdown********//

  console.log("Entered displayArray() function.");

  aLength = array.length;
	text = "";

  //For each item in array: remove whitespace and apostrophes, construct and append button element to text
	for (i = 0; i < aLength; i++) {
  var ingName = array[i].replace(/\s+/g, '');
  ingName = ingName.replace(/'/g, '');
  text  += "<button type='button' class='dropButton' name='btn" + ingName +"'>" + array[i] + "</button>";
  }

  //Append text, containing all new button elements, to HTML
  console.log("Appending to myDropdown");
  $('#myDropdown').append(text);


  //********JQuery on click of ingredient in dropdown menu********//
  $(".dropButton").click(function(){
      //When button clicked append log to console
      console.log("A button has been clicked.");
      //alert("Button has been clicked.");
      console.log(this);

      //Make dropdown invisible again.
      document.getElementById("myDropdown").classList.toggle("show");
      console.log("Dropdown hidden.");
      //Create variable to hold display name of ingredient from clicked button
      var ingredient = $(this).text();
      //Create variable to hold altered name of ingredient for id (No whitespace)
      var ingId = ingredient.replace(/\s+/g, '');
      ingId = ingId.replace(/'/g, '');
      //Add log to console of ingredient variable
      console.log(ingredient);

      //Create variable to hold html string for new button element
      var text = "<button class='recipe-ingredient' type='button' name='button' id='btn" + ingId + "'>" + ingredient + "</button>";
      //Append html string to page
      $('#button-container').append(text);
      console.log("Ingredient button added.");

      //Go to function for getting drink suggestions from theCocktailDB api
      console.log("Going to getDrinksFromCocktailDB()");
      getDrinksFromCocktailDB();

      //********JQuery on click of ingredient once added from search********//
      $(".recipe-ingredient").click(function(){
          //Append to console a log that ingredient button has been clicked.
          console.log("Recipe Ingredient Clicked.");
          console.log(this);

          //Append log to console that dropdown should be hidden
          console.log("Dropdown hidden.");
          //Create variable to hold display name of ingredient from clicked button
          var ingredient = $(this).text();
          //Append log to console of ingredient
          console.log(ingredient);
          //Create variable to construct and hold ID of button clicked
          var ingId = "#btn" + ingredient.replace(/\s+/g, '');
          //Append log to console of constructed ID
          console.log(ingId);
          //Remove button
          $(ingId).remove();

          //Splice ingredient of removed button from array
          console.log("About to try splicing element from array.");

          //Get array of current ingredient buttons
          var clientArray = getArray();
          //Remove element from array associated with ingredient to be removed
          clientArray = removeFromArray(clientArray, ingredient);

          //Append altered array to console
          console.log("ClientArray passed back.");
          console.log(clientArray);

      });
  });

}

// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
$('#search-bar').click(function() {
  //alert("Click tried to do something");
  console.log("jquery click() entered.");

  document.getElementById("myDropdown").classList.toggle("show");
  });

$('#search-bar').keyup(function() {
  //alert("Keyup tried to do something");
  console.log("jquery keyup() entered.");

  var input, filter, ul, li, button, i;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  button = div.getElementsByTagName("button");
  for (i = 0; i < button.length; i++) {
      if (button[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          button[i].style.display = "";
      } else {
          button[i].style.display = "none";
      }
  }
  });

  function getArray() {

      var clientArray = [];

      $("#button-container").find(":button").each(function(){ clientArray.push($(this).text()); });
      console.log(clientArray);
      console.log("getArray() returning clientArray");
      return clientArray;

  }

  function addToArray(array, ingredient) {

    if (array === undefined) {
    //If array does not exist.
    console.log("Array is does not exist, breaking from function.");
    break;
    }
    else {
    //Else array does exist.
    array.push(ingredient);
    console.log("Pushed " + ingredient + " into array.");
    }
    //return updated array
    return array;
  }

  function removeFromArray(array, ingredient) {

    if (array === undefined) {
      //If array does not exist
      console.log("Array does not exist. Breaking from function.");
    }

    else if (array.length == 0) {
      //If array is empty
      console.log("Array is empty. Breaking from function.");
    }
    else {
      //Else array exists and is not empty
      //For each element in array (Beginning from last element)
      for(var i = array.length - 1; i >= 0; i--) {
      //If current array item matches ingredient
      if(array[i] === ingredient) {
        //Splice item out of array
         array.splice(i, 1);
         console.log("Spliced " + ingredient + " out of array.");
      }
      }
      //return updated array
      return array;
    }
  }

function getDrinksFromCocktailDB() {

    var ingredientArray = getArray();

    console.log("Ingredient Array : " + ingredientArray);

    var searchterms = "";
    var url = "";
    var currentArray = [];
    var oldArray = [];
    var printArray = [];
    var newArray = [];

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
        console.log("Beginning of loop, i is: " + i);
        console.log("Beginning of loop, length is:" + length);
        //oldArray = printArray;
        //Build url to get json
        searchterms = ingredientArray[i].replace(/\s+/g, '_');
        searchterms = searchterms.replace(/'/g, '');
        url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchterms;
        console.log(url);
        //Get json array using url
        //****Gets to here, skips out of for****//
        $.getJSON(url, function(jsondata) {
            console.log("jsondata returned");
            //Create array of drinks from jsondata
            currentArray = $.map(jsondata.drinks, function (el) {
            return el.strDrink;
            });
            console.log("Array made from JSON data: " + currentArray);
            if (i === 0) {
              console.log("i = 0, making printArray equal to currentArray.")
              printArray = currentArray;
            }
            else {
              $.each( currentArray, function( key, value ) {
                console.log("Entered each for creating updated printArray.");
                var index = $.inArray( value, printArray );
                //If index is not -1, it is in the array. Push into new print array.
                if( index != -1 ) {
                  console.log( "Index does not equal negative one: " + index );
                  console.log(printArray);
                  newArray.push(currentArray[index]);
                  console.log("Just pushed:" + currentArray[index]);
                }
              });
            }
        });
        if (i === count-1) {
          var delayInMilliseconds = 500;
          setTimeout(function()
          {
          if (newArray.length > 2 ) {
            printArray = newArray;
          }
          console.log("Going to displayCocktails()");
          console.log("Current PrintArray: " + printArray);
          displayCocktails(printArray);
          },delayInMilliseconds);

        }
    });

}

function displayCocktails(printArray) {
  console.log("Entered displayCocktails")
  //Basic test version
  var text = "";
  var name = "";
  var counter = 0;
  printArray.length = 11;
  var length = printArray.length;
  var tempStr = "";
  $.each(printArray, function(index, val) {
    console.log(printArray[index]);
    name  = printArray[index];

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

  console.log("appendCocktailBox entered.");
  var searchName = "";
  searchName = name.replace(/\s+/g, '_');
  searchName = searchName.replace(/'/g, '');
  var myUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName;
  console.log("Url: " + url)

  //Using ajax call to not be asynchronous
  $.ajax({
  url: myUrl,
  dataType: 'json',
  async: false,
  data: jsondata,
  success: function(data) {
    console.log("jsondata = " + jsondata);
    var image = jsondata.drinks[0].strDrinkThumb;
    var desc = jsondata.drinks[0].strInstructions;
    console.log("Image: " + image);
    console.log("Desc: " + desc);

    var string = "";
    string += "<div class=\"col-sm\">";
    string += "<img src=\"" + image + "\" alt=\"Picture of " + name + "\" class=\"img-thumbnail\">";
    string += "<h3>" + name + "</h3>";
    string += "<p>" + desc + "</p>";
    string += "</div>";
    console.log("HTMLstring: " + string);
    text += string;
    return text;
  }
  });
  // $.getJSON(url, function(jsondata) {
  //   var delayInMilliseconds = 500;
  //   setTimeout(function()
  //   {
  //   console.log("jsondata = " + jsondata);
  //   var image = jsondata.drinks[0].strDrinkThumb;
  //   var desc = jsondata.drinks[0].strInstructions;
  //   console.log("Image: " + image);
  //   console.log("Desc: " + desc);
  //
  //   var string = "";
  //   string += "<div class=\"col-sm\">";
  //   string += "<img src=\"" + image + "\" alt=\"Picture of " + name + "\" class=\"img-thumbnail\">";
  //   string += "<h3>" + name + "</h3>";
  //   string += "<p>" + desc + "</p>";
  //   string += "</div>";
  //   console.log("HTMLstring: " + string);
  //   text += string;
  //   return text;
  //
  //   },delayInMilliseconds);
  // });
}

function appendCocktailRowEnd(text) {

  var string = "";
  console.log("appendCocktailRowEnd entered.");
  string += "</div>";
  console.log("HTMLstring: " + string);
  text += string;
  return text;
}
