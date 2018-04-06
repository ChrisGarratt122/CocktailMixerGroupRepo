$(function(){

  //Append log to console about document being ready (Entered js)
  console.log("Document Ready");

  //Append log about entering function tog et api list, enter function
  console.log("About to enter getIngredientsFromCocktailDB()");
  getIngredientsFromCocktailDB();

  // //appendCocktailRowStart();
  //
  // alert("About to attempt box append");
  //
  // // appendCocktailBox('Mojito');
  // // appendCocktailBox('Margarita');
  // // appendCocktailBox('Black Russian');
  //
  // alert("About to attempt end of row append.");
  //
  // // appendCocktailRowEnd();

  // alert("Returned after appends;");

  //document.getElementById("bordercontainer").appendChild=
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


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
      //getDrinksFromCocktailDB();

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

//}

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

    var ingredientArray = [];
    ingredientArray = getArray();

    //For each ingredient in array
    for (i = 0; i < ingredientArray.length; i++) {
        //
    }


    var url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchterms;

    $.getJSON(url, function(jsondata) {
      //Test alert to show getJSON function has been entered


      //Send jsondata and target number to printing function
      printDescription(jsondata, targetno);
    });

}

function appendCocktailRowStart() {

  alert("appendCocktailRowStart entered.");
  var htmlstring = "";
  htmlstring += '<div class=\"row text-center\">';

  $("#bordercontainer").append(htmlstring);

}

function appendCocktailBox(name) {

  alert("appendCocktailBox entered.");
  var htmlstring = "";
  htmlstring += "<div class=\"col-sm\">";
  htmlstring += "<img src=\"img/Mojito.jpg\" alt=\"...\" class=\"img-thumbnail\">";
  htmlstring += "<h3>" + name + "</h3>";
  htmlstring += "<p>Test text</p>";
  htmlstring += "</div>";

  $("#bordercontainer").append(htmlstring);


}

function appendCocktailRowEnd() {

  alert("appendCocktailRowEnd entered.");
  var htmlstring = "</div>";

  $("#bordercontainer").append(htmlstring);

}
