var Country = require('./../js/country.js').countryModule;

$(document).ready(function() {
  var country = new Country();
  $('#start').click(function() {
    $('#country').html(country.randomCountry());
    $('#instruction').text("Now go to the map and click on the country");
    $('#start').hide();
    $('#next').show();
  });
  $('#next').click(function(){
    var answer = $('#country').text().toLowerCase();
    var userGuess = $('#countryClicked').text().toLowerCase();
    if (answer === userGuess) {
      this.score ++;
      //display results yes or no in instruction place with next instructions
      //display new score
      //renew random country
    } //else
      //display your a loser message in instructions
      //play again? button  
  });
});
