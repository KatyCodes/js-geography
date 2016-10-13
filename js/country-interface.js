var Country = require('./../js/country.js').countryModule;

$(document).ready(function() {
  var country = new Country();
  $('#start').click(function() {
    $('#country').text(country.randomCountry());
  });

  
});
