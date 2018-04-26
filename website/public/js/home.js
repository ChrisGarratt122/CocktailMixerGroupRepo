$(function(){

  //Append log to console about document being ready (Entered js)
  console.log("Document Ready");

  //Adding class to body to allow fade in animation
  $('body').addClass('animated fadeIn');

  //Adding class to body to allow fade out, when navigation button is clicked
  $( "nav li a" ).on( "click", function() {
      $('body').addClass('animated fadeOut');
  });

  //Append log about entering function to get api list, enter function
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

  //Append log showing array to console
  console.log(array);

  //Append console log about entering displayArray function, call function and pass json
  console.log("About to enter displayArray() function.");
  displayArray(array);
}

function displayArray(array) {

  //******Building and displaying ingredients from API in dropdown********//

  //Append log showing entry into function
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
      //Append log to console showing what button has been clicked
      console.log(this);

      //Make dropdown invisible again.
      document.getElementById("myDropdown").classList.toggle("show");
      console.log("Dropdown hidden.");
      //Create variable to hold display name of ingredient from clicked button
      var ingredient = $(this).text();
      //Create variable to hold altered name of ingredient for id (No whitespace or apostrophes)
      var ingId = ingredient.replace(/\s+/g, '');
      ingId = ingId.replace(/'/g, '');
      //Add log to console of ingredient variable
      console.log(ingredient);

      //Create variable to hold html string for new button element
      var text = "<button class='recipe-ingredient' type='button' name='button' id='btn" + ingId + "'>" + ingredient + "</button>";
      //Append html string to page
      $('#button-container').append(text);
      //Add log to show this happened
      console.log("Ingredient button added.");

      //Go to function for getting drink suggestions from theCocktailDB api, log this
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

          //Send ingredient name to remove function
          console.log("Sending to remove: " + ingredient);
          removeCocktails(ingredient);

          //Append log to console of ingredient
          console.log(ingredient);
          //Create variable to construct and hold ID of button clicked
          //Replace spaces with underscores, remove apostrophes
          var ingId = "#btn" + ingredient.replace(/\s+/g, '');
          ingId = ingId.replace(/'/g, '');
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

// When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
$('#search-bar').click(function() {
  //Append log to console, showing a click has happened
  console.log("jquery click() entered.");

  //Show dropdown for search filter
  document.getElementById("myDropdown").classList.toggle("show");
  });

// When user presses key while in search bar
$('#search-bar').keyup(function() {
  //Log that this happened
  console.log("jquery keyup() entered.");

  //Declare variables to hold elements, input and filter phrase
  var input, filter, li, button, i;
  //Make input var hold search-bar element
  input = document.getElementById("search-bar");
  //Make filter var hold phrase from input to filter
  filter = input.value.toUpperCase();
  //Make div var hold div element
  div = document.getElementById("myDropdown");
  //Make button var hold button element
  button = div.getElementsByTagName("button");
  //For each button in dropdown
  for (i = 0; i < button.length; i++) {
      //If text of button (Corresponding ingredient) matches part of filter phrase
      if (button[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          //Keep button display
          button[i].style.display = "";
      //Else
      } else {
          //There is no match - make button not display
          button[i].style.display = "none";
      }
  }
  });

  //Function for retrieval of Array for ingredients currently selected by user
  function getArray() {

      //Create variable to hold array
      var clientArray = [];

      //Find each button in relevant container div, push name of corresponding ingredient to array
      $("#button-container").find(":button").each(function(){ clientArray.push($(this).text()); });
      //Log array
      console.log(clientArray);
      //Log returning from function
      console.log("getArray() returning clientArray");
      //Return array
      return clientArray;

  }

  //Function to add ingredient into selected ingredient array
  function addToArray(array, ingredient) {

    if (array === undefined) {
    //If array does not exist.
    //Log this
    console.log("Array is does not exist, breaking from function.");
    //Break from function
    break;
    }
    else {
    //Else array does exist.
    //Push ingredient into array
    array.push(ingredient);
    //Log this
    console.log("Pushed " + ingredient + " into array.");
    }
    //return updated array
    return array;
  }

  //Function to remove ingredient from currently selected array
  function removeFromArray(array, ingredient) {

    if (array === undefined) {
      //If array does not exist
      //Log this
      console.log("Array does not exist. Breaking from function.");
    }
    //Else
    else if (array.length == 0) {
      //If array is empty
      //Log this
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
         //Log this
         console.log("Spliced " + ingredient + " out of array.");
      }
      }
      //return updated array
      return array;
    }
  }

//Function to get relevant drinks from API
function getDrinksFromCocktailDB() {

    //Create variable to hold array of currently selected ingredients
    var ingredientArray = getArray();

    //Log array
    console.log("Ingredient Array : " + ingredientArray);

    //Create variables to hold search terms, url, array to hold current list of drinks,
    //and array to print
    var searchterms = "";
    var url = "";
    var currentArray = [];
    var printArray = [];

    //Log showing function has been entered
    console.log("getDrinksFromCocktailDB() entered.")

    //Log length of ingredient array
    console.log("Ingredient Array length : " + ingredientArray.length);
    //Create variable to hold array length
    var length = ingredientArray.length;
    //Log variable
    console.log("Before for length is: " + length);

    //Build url to get json, using api url and search terms from current ingredient
    searchterms = ingredientArray[ingredientArray.length - 1].replace(/\s+/g, '_');
    searchterms = searchterms.replace(/'/g, '');
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + searchterms;
    //Log url
    console.log(url);

    //Get json array using url
    $.getJSON (url, function (data) {
      //Log that jsondata has been retrieved
      console.log("jsondata returned");
      //Create array of drinks from jsondata, log it is happening
      currentArray = $.map(data.drinks, function (el) {
      console.log("MAPPING");
      return el.strDrink;
      });
      //Log array
      console.log("Array made from JSON data: " + currentArray);
      //Log that array to print is being made equal to current array
      console.log("Making printArray equal to currentArray.")
      printArray = currentArray;

      //Set short delay beofre accessing print array
      var delayInMilliseconds = 200;
      setTimeout(function()
      {
      //Log array being passed to display function
      console.log("Going to displayCocktails()");
      console.log("Current PrintArray: " + printArray);
      displayCocktails(printArray);
      },delayInMilliseconds);

  });
}

//Function to display drinks on page taken from array
function displayCocktails(printArray) {
  //Log that function has been entered
  console.log("Entered displayCocktails")

  //Create variables to hold text to append, name of current drink, count of current index
  var text = "";
  var name = "";
  var counter = 0;
  //If array to print is large, shorten it
  if (printArray.length > 11) {
      printArray.length = 15;
  }
  //Create var to hold length of array and temporary string
  var length = printArray.length;
  var tempStr = "";
  //Jquery for each in array do function
  $.each(printArray, function(index, val) {
    //Log current drink
    console.log(printArray[index]);
    //Assign to name var
    name  = printArray[index];
    //Log name
    console.log("Name: " + name);
    //Log counter
    console.log("Counter =" + counter);

    //Create var to hold array of currently selected ingredients
    var ingredientsArray = getArray();
    //Create var to hold current ingredient in selected array
    var ingredient = ingredientsArray[ingredientsArray.length - 1];
    //Replace spaces in ingredient to underlines
    ingredient = ingredient.replace(/\s+/g, '_');

    //If array is not empty and this drink is last in array
    if (index === (length - 1) && index != 0) {
        //Make tempstr closing div tag
        tempStr = "</div>";
        //Add to full text string
        text += tempStr;
        //Log this was appended
        console.log("Appending final row end.");
    //Else
    } else {
      //If First drink in block of two
      if (counter == 0) {
        jsondata = "";

        //Empty tempstring
        tempStr = "";
        //Add start of new row to temp string
        tempStr = "<div class=\"row text-center " + ingredient +"\">";
        //Log this happened
        console.log("Appending row start div.");
        //Pass name of dirnk to function create new cocktail box, add to temp string
        tempStr += appendCocktailBox(name);
        //Append temp string to text
        text += tempStr;
        //Else if end drink in block of two
      } else if (counter == 2) {
        //Append new box of drink to temp string
        tempStr = "";
        tempStr = appendCocktailBox(name);
        //Apprn row closing tag
        tempStr = "</div>";
        //Log this happened
        console.log("Appending row end div.");
        //Set counter to -1 so next drink recognised as start of row
        counter = -1;
        //Append temp string to text
        text += tempStr;
        //Else
      } else {
        //Append normal box
        tempStr = "";
        tempStr = appendCocktailBox(name);
        //Add to text
        text += tempStr;
      }
      //Increase counter
      counter = counter + 1;
    }
  });
  //Append to text to htlm container, log this happened
  console.log("About to append full html string.");
  $("#bordercontainer").append(text);

  //Jquery when overplay plus clicked
  $(".fa-plus").click(function(e){
      //Log id of nearest parent found with class  .col-sm
      console.log("PARENT TEST: " + $(this).closest(".col-sm").attr('id'));
      //Create variable to hold this element
      var currentCocktail = $(this).closest(".col-sm").attr('id');

      //Fade in image overlay
      $(".image-overlay").fadeIn(1000).queue(function(n) {
      //Fade out after interval
      $(this).fadeOut(1000); n();
      });
      //Append to console a log that ingredient button has been clicked.
      console.log("Cocktail Clicked.");
      console.log(currentCocktail);
      //Create variable to hold display name of ingredient from clicked button
      e.preventDefault();

      //Make syntax correct id of cocktail name and assign to variable
      var cocktailid = currentCocktail;
      cocktailid = cocktailid.replace(/\s+/g, '_');
      cocktailid = cocktailid.replace(/'/g, '');

      //Ajax POST to server to add cocktail to logged in user's database
      $.ajax({
        type: 'POST',
        url: '/adddrink',
        data: JSON.stringify({
          "field1": cocktailid
        }),
        dataType: "json",
        cache: false,
        contentType: "application/json",
        success: function(data) {}
      });
    })
  };

//Function to construct cocktail display box given cocktail name
function appendCocktailBox(name) {

  //Log function has been entered and passed name
  console.log("Name: " + name);
  console.log("appendCocktailBox entered.");
  //Create var to hold search name
  var searchName = "";
  //Replace spaces with underlines to make syntax correct
  searchName = name.replace(/\s+/g, '_');
  //Log syntax correct name
  console.log(searchName);
  //Ensure apostrophes are removed for syntax
  searchName = searchName.replace(/'/g, '');
  //Contruct url variable from url and search name
  var myUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchName;
  //Log url name
  console.log("Url: " + myUrl)

  //Create variable to hold string during string construction
  var string = "";
  //Use ajax call to retrieve information for current cocktail from api
  $.ajax({
  url: myUrl,
  dataType: 'json',
  async: false,
  //data: data,
  success: function(data) {
    //On retrieval of data log returned data
    console.log("jsondata = " + data);

    //Create variable to hold relevant image and relevant description of cocktail
    var image = data.drinks[0].strDrinkThumb;
    var desc = data.drinks[0].strInstructions;
    //Log these
    console.log("Image: " + image);
    console.log("Desc: " + desc);

    //Create variable to hold array of currently selected ingredients
    var ingredientsArray = getArray();
    //Get last ingredient in array
    var ingredient = ingredientsArray[ingredientsArray.length - 1];
    //Replace spaces for syntax
    ingredient = ingredient.replace(/\s+/g, '_');

    //BUILD COCKTAIL BOX ELEMENTS
    string += "<div id=\"" + name + "\" class=\"col-sm " + ingredient + "\">";
    string += "<div class=\"home-image\">";
    string += "<img src=\"" + image + "\" alt=\"Picture of " + name + "\" class=\"img-thumbnail\">";
    string += "<div class=\"overlay-test\">";
    string += "<a href=\"\" class=\"icon\">";
    string += "<i class=\"fas fa-plus\"></i>";
    string += "</a>";
    string += "</div>";
    string += "</div>";
    string += "<h3>" + name + "</h3>";
    string += "<p>" + desc + "</p>";
    string += "</div>";
  }
  });
  //Return string
  return string;
}

//Function to empty cocktail display
function resetCocktails() {
  $("#bordercontainer").empty();
}

//Function to removed corresponding cocktail boxes give ingredient
function removeCocktails (name) {
    //Log entry to function
    console.log("Entered remove function.");

    //Create var to hold string of class for corresponding ingredient
    var ingredient = "." + name.replace(/\s+/g, '_');
    //Log class  being searched
    console.log("SEARCHING FOR:" + ingredient);

    //For each element in display box with this class
    $('#bordercontainer').children(ingredient).each(function () {
      //Log element has been found
      console.log("Something found");
      //Remove this element
      $(this).remove();
    });
}
