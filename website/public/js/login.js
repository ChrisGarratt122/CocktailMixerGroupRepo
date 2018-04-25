$("#loginform").submit() {


  $('#submit').click(function(){
   if(($('#inputUsername').val() == '') || ($('#inputPassword').val() == '')){
      console.log('Username or Password is left blank.');
      $('#Message').text()="Username or Password is left blank. Please amend this."
   }
});
}
