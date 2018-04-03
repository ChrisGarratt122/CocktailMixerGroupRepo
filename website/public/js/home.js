$(function(){
  //alert("document ready");

  //Get Info for first top pick from API

  //Test alert
  //alert("Getting 'Mojito' from API")

  // getResultFromCocktailDB("Mojito", "1");
  // getResultFromCocktailDB("Margarita", "2");
  // getResultFromCocktailDB("Black_Russian", "3");
  // getResultFromCocktailDB("Black_Forest_Shake", "4");

  alert("Function entered, about to attempt html insert");

  document.getElementById("bordercontainer").innerHTML= "<%- include('../partials/cocktailbox',{name1:'MojitoTest1',name2:'MargaritaTest1',name3:'Black RussianTest1'}) %>;";
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest1",name2:"MargaritaTest1",name3:"Black RussianTest1"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest2",name2:"MargaritaTest2",name3:"Black RussianTest2"}) %>
  // <%- include("../partials/cocktailbox",{name1:"MojitoTest3",name2:"MargaritaTest3",name3:"Black RussianTest3"}) %>;


});
