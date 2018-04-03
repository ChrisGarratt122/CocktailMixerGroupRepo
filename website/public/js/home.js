$(function(){
  //alert("document ready");

  //Get Info for first top pick from API

  //Test alert
  //alert("Getting 'Mojito' from API")

  // getResultFromCocktailDB("Mojito", "1");
  // getResultFromCocktailDB("Margarita", "2");
  // getResultFromCocktailDB("Black_Russian", "3");
  // getResultFromCocktailDB("Black_Forest_Shake", "4");

  alert("Function entered, about to attempt row append");

  appendCocktailRow();

  alert("About to attempt box append");

  appendCocktailBox();

  //document.getElementById("bordercontainer").appendChild=
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


});

function appendCocktailRow() {

  alert("appendCocktailRow entered.")
  var htmlstring = "<div class='row text-center'></div;"

  $("#bordercontainer").append(htmlstring);

}

function appendCocktailBox() {

  alert("appendCocktailBox entered.")
  var htmlstring = "";

}
