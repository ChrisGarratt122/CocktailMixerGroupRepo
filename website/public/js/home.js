$(function(){

  // alert("document ready");
  console.log("Document Ready");

  console.log("About to enter getIngredientsFromCocktailDB()");
  getIngredientsFromCocktailDB();

  console.log("About to get client array");
  var clientArray = [];
  console.log("Client array created: " + clientArray);


  // $(".recipe-ingredient").click(function(){
  //     console.log("Recipe Ingredient Clicked.");
  //     console.log(this);
  //
  //     //******Remove button from page?
  //
  //     console.log("Dropdown hidden.");
  //     var ingredient = $(this).text();
  //     console.log(ingredient);
  //
  //     console.log("About to try splicing element from array.");
  //     clientArray = removeFromArray(clientArray, ingredient);
  //     console.log("ClientArray passed back.");
  //     console.log("clientArray");
  //
  // });

  //
  // alert("Function entered, about to attempt start of row append");
  //
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
  //
  // alert("Returned after appends;");

  //document.getElementById("bordercontainer").appendChild=
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


});


//Function gets data from theCocktailDB API
function getIngredientsFromCocktailDB() {
  //Test alert telling that function has been entered
  //alert("getResultFromCocktailDB entered");

  //call cocktail API using Ajax
  //build url for the request
  console.log("Entered getIngredientsFromCocktailDB()");

  var url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list"

  //Test alert to display url variable
  //alert("Url built: " + url);
  console.log("Url: " + url);

  //use jquery json shortcut
  $.getJSON(url, function(jsondata) {
    //Test alert to show getJSON function has been entered
    //alert("getJson function has been entered");

    //Send jsondata to array building function

    console.log("About to enter buildArray() function.");
    buildArray(jsondata);
  });
}

function buildArray(jsondata) {

  console.log("Entered buildArray() function.");

  var array = $.map(jsondata.drinks, function (el) {
  return el.strIngredient1;
  });

  // $.each(jsondata.drinks, function (index, drink) {
  //       array.push(drinks.strInstructions); //push values here
  // });

  console.log(array); // see the output here

  console.log("About to enter displayArray() function.");
  displayArray(array);

}

function displayArray(array) {

  console.log("Entered displayArray() function.");

  aLength = array.length;
	text = "";

	for (i = 0; i < aLength; i++) {
  ingName = array[i].replace(/\s+/g, '');
  text  += "<button type='button' class='dropButton' name='btn" + ingName +"'>" + array[i] + "</button>";
  //text += "<a href='' id='link" + ingName  + "'>" + array[i]  + "</a>";
  }

  console.log("Appending to myDropdown");
  $('#myDropdown').append(text);

  $(".dropButton").click(function(){
      console.log("A button has been clicked.");
      alert("Button has been clicked.");
      console.log(this);

      //Make dropdown invisible again.
      document.getElementById("myDropdown").classList.toggle("show");
      console.log("Dropdown hidden.");
      var ingredient = $(this).text();
      console.log(ingredient);

      var text = "<button class=\"recipe-ingredient\" type=\"button\" name=\"button\">" + ingredient + "</button>";
      $('#button-container').append(text);
      console.log("Ingredient button added.");

      $(".recipe-ingredient").click(function(){
          console.log("Recipe Ingredient Clicked.");
          console.log(this);

          //******Remove button from page?

          console.log("Dropdown hidden.");
          var ingredient = $(this).text();
          console.log(ingredient);

          console.log("About to try splicing element from array.");
          var clientArray = getArray();
          clientArray = removeFromArray(clientArray, ingredient);
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

// $('a').click(function() {
//     var ingredient = $(this).text();
//     console.log("Ingredient Selected: " + ingredient + ".");
//
//     var text = "<button class=\"recipe-ingredient\" type=\"button\" name=\"button\">" + ingredient + "</button>";
//     $('#button-container').append(text);
// });

// $(":button").click(function(){
//     console.log("A button has been clicked.");
//     //Make dropdown invisible again.
//     document.getElementById("myDropdown").classList.toggle("show");
//     console.log("Dropdown hidden.");
//
//     var text = "<button class=\"recipe-ingredient\" type=\"button\" name=\"button\">" + ingredient + "</button>";
//     $('#button-container').append(text);
//     console.log("Ingredient button added.");
// });



//*******Functions for dropdown box******//

// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }
//
// function filterFunction() {
//     var input, filter, ul, li, button, i;
//     input = document.getElementById("search-bar");
//     filter = input.value.toUpperCase();
//     div = document.getElementById("myDropdown");
//     button = div.getElementsByTagName(":button");
//     for (i = 0; i < button.length; i++) {
//         if (button[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
//             button[i].style.display = "";
//         } else {
//             button[i].style.display = "none";
//         }
//     }
// }

//*******Functions for altering local ingredient array********//

function getArray() {

    // //If array doesn't exist, create it
    // if (name === undefined) {
    //   console.log("Client array does not exist yet.");
    //   console.log("Creating client array.");
    //   var clientArray = [];
    //   return clientArray;
    // }
    // else {
    //   console.log("Array does exist, passing back.");
    //   //return Array;
    //   return name;

    var clientArray = [];
    $( "#button-container" ).each(function( index ) {
  console.log( index + ": " + $( this ).text() );
    });

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
