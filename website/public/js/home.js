$(function(){
  //alert("document ready");

  //Get Info for first top pick from API

  //Test alert
  //alert("Getting 'Mojito' from API")

  // getResultFromCocktailDB("Mojito", "1");
  // getResultFromCocktailDB("Margarita", "2");
  // getResultFromCocktailDB("Black_Russian", "3");
  // getResultFromCocktailDB("Black_Forest_Shake", "4");

  alert("Function entered, about to attempt start of row append");

  appendCocktailRowStart();

  alert("About to attempt box append");

  appendCocktailBox('Mojito');

  alert("About to attempt end of row append.")

  appendCocktailRowEnd();

  alert("Returned after appends;")

  //document.getElementById("bordercontainer").appendChild=
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


});

function appendCocktailRowStart() {

  alert("appendCocktailRowStart entered.")
  var htmlstring = "<div class='row text-center'>"

  $("#bordercontainer").append(htmlstring);

}

function appendCocktailBox(name) {

  alert("appendCocktailBox entered.")
  var htmlstring = "";
  htmlstring += "<div class='col-sm'";
  htmlstring += "<img src='img/Mojito.jpg' alt='...' class='img-thumbnail'>";
  htmlstring += "<h3>" + name + "</h3>";
  htmlstring += "<p>Test text</p>";
  htmlstring += "</div>";

  $("#bordercontainer").append(htmlstring);


}

function appendCocktailRowEnd() {

  alert("appendCocktailRowEnd entered.")
  var htmlstring = "</div>"

  $("#bordercontainer").append(htmlstring);

}
