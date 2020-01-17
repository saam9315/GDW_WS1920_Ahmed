const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBa0pkN9HR04XUDVLvJhxtU6LUoeuTJbV4',
    Promise: Promise
  });
  
  
  //   * Making a geocode request.
  googleMapsClient.geocode({
      address: 'Gummersbach, Deutschland'
    })
    .asPromise()
    .then((response) => {
      //console.log(response.json.results);
      var latitude = response.json.results[0].geometry.bounds.northeast.lat;
        var longitude = response.json.results[0].geometry.bounds.northeast.lng;


        console.log(latitude);
        console.log(longitude);
    })
    .catch((err) => {
      console.log(err);
    });
  
  
  // * Making a reverse geocode request.
  /*googleMapsClient.reverseGeocode({
      latlng: '0.714224,-73.961452'  // latlong format
    })
    .asPromise()
    .then((response) => {
      console.log(response.json.results);
    })
    .catch((err) => {
      console.log(err);
    });*/