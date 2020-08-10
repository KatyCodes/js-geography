var apiKey = require('./../.env').apiKey;



Map.prototype.randomCountry = function() {
  var length = this.countries.length;
  var random = Math.floor(Math.random() * length);
  this.answer = this.countries[random];
};

Map.prototype.playGame = function() {
  var _this = this;
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition(function(position) {
      //var pos = {
        //lat: -34.397,
        //lng: position.coords.longitude
      //};
      _this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 15.326572, lng: -25.326572},
        zoom: 2,
        styles: [
          {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
          {elementType: 'labels.text.fill', stylers: [{visibility: 'off'}]},
          {elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
          {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [{color: '#000000'}]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{color: '#ebe3cd'}]
          },
          {
            featureType: 'poi',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'road',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#0077b3'}]
          },
        ]
      });

      _this.map.setOptions({ draggableCursor: 'url("../img/cursor.png"), auto' });

      _this.map.addListener("click", function (event) {
        var latitude = event.latLng.lat();
        var longitude = event.latLng.lng();
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + apiKey).then(function(response){
          response.results["0"].address_components.forEach(function(item) {
            if (item.types.includes('country')) {
              _this.userGuess = item.long_name;
            }
          });
          if (_this.answer.toLowerCase() === _this.userGuess.toLowerCase()) {
            _this.score ++;
            $('#score').text(_this.score);
            $('#instruction').text("Good job! You are a real genius! Now go find:");
            _this.randomCountry();
            $('#country').html(_this.answer);
          } else {
            $('#instruction').text("Sorry, game over! That's " + _this.userGuess + ". See the map for the correct answer. Play again?");
            $('#next').show();
            $('#country').hide();
            var markerPosition;
            $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + _this.answer + '&key=' + apiKey).then(function(response){
              markerPosition = response.results["0"].geometry.location;
              _this.marker = new google.maps.Marker({
                position: markerPosition,
                map: _this.map,
                label: {
                    text: _this.answer,
                    color: 'black',
                    fontFamily: 'Roboto, Arial, sans-serif',
                    fontWeight: 'bolder',
                    fontSize: '2rem'
                  }
              });
              _this.map.setCenter(markerPosition);
              _this.map.setZoom(4);
            });
          }
        });
      });


    // }, function(error) {
    //   $('#map').text(error);
    // });
  } else {
    var _this = this;

    $('#map').text('Please enable location access in your browser. If you choose not to this may affect the performance of the game.');
  }
};

exports.mapModule = Map;
