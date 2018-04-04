$(function(){
  //alert("document ready");


  //Test alert
  //alert("Getting 'Mojito' from API")
  alert("About to create array.");

  alert("Function entered, about to attempt start of row append");

  //appendCocktailRowStart();

  alert("About to attempt box append");

  // appendCocktailBox('Mojito');
  // appendCocktailBox('Margarita');
  // appendCocktailBox('Black Russian');

  alert("About to attempt end of row append.");

  // appendCocktailRowEnd();

  alert("Returned after appends;");

  //document.getElementById("bordercontainer").appendChild=
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


});

// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
$('#search-bar').click(function() {
  alert("Click tried to do something");
  document.getElementById("myDropdown").classList.toggle("show");
  });

$('#search-bar').keyup(function() {
  alert("Keyup tried to do something");

  var input, filter, ul, li, a, i;
  input = document.getElementById("search-bar");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          a[i].style.display = "";
      } else {
          a[i].style.display = "none";
      }
  }
  });
//
//
//
//
// // function myFunction() {
// //     document.getElementById("myDropdown").classList.toggle("show");
// // }
// //
// // function filterFunction() {
// //     var input, filter, ul, li, a, i;
// //     input = document.getElementById("search-bar");
// //     filter = input.value.toUpperCase();
// //     div = document.getElementById("myDropdown");
// //     a = div.getElementsByTagName("a");
// //     for (i = 0; i < a.length; i++) {
// //         if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
// //             a[i].style.display = "";
// //         } else {
// //             a[i].style.display = "none";
// //         }
// //     }
// // }
//
// function getArray(name) {
//
//     //If array doesn't exist, create it
//     var arr = name || [];
//
//     //Return array
//     return arr;
// }
//
// function addToArray(array, ingredient) {
//
//   if (array === undefined) {
//   //If array does not exist.
//   console.log("Array is does not exist, breaking from function.");
//   break;
//   }
//   else {
//   //Else array does exist.
//   array.push(ingredient);
//   console.log("Pushed " + ingredient + " into array.");
//   }
//   //return updated array
//   return array;
// }
//
// function removeFromArray(array, ingredient) {
//
//   if (array === undefined) {
//     //If array does not exist
//     console.log("Array does not exist. Breaking from function.");
//     break;
//   }
//
//   else if (array.length == 0) {
//     //If array is empty
//     console.log("Array is empty. Breaking from function.");
//     break;
//   }
//   else {
//     //Else array exists and is not empty
//     //For each element in array (Beginning from last element)
//     for(var i = array.length - 1; i >= 0; i--) {
//     //If current array item matches ingredient
//     if(array[i] === ingredient) {
//       //Splice item out of array
//        array.splice(i, 1);
//        console.log("Spliced " + ingredient + " out of array.");
//     }
//     //return updated array
//     return array;
// }
//
//   }
//
// function appendCocktailRowStart() {
//
//   alert("appendCocktailRowStart entered.");
//   var htmlstring = "";
//   htmlstring += '<div class=\"row text-center\">';
//
//   $("#bordercontainer").append(htmlstring);
//
// }
//
// function appendCocktailBox(name) {
//
//   alert("appendCocktailBox entered.");
//   var htmlstring = "";
//   htmlstring += "<div class=\"col-sm\">";
//   htmlstring += "<img src=\"img/Mojito.jpg\" alt=\"...\" class=\"img-thumbnail\">";
//   htmlstring += "<h3>" + name + "</h3>";
//   htmlstring += "<p>Test text</p>";
//   htmlstring += "</div>";
//
//   $("#bordercontainer").append(htmlstring);
//
//
// }
//
// function appendCocktailRowEnd() {
//
//   alert("appendCocktailRowEnd entered.");
//   var htmlstring = "</div>";
//
//   $("#bordercontainer").append(htmlstring);
//
// }
