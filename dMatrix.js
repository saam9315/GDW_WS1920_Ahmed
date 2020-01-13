const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBa0pkN9HR04XUDVLvJhxtU6LUoeuTJbV4',
  Promise: Promise
});


// * Making a distance matrix request.
const coordinates = {
  origins: {
    lat: '55.930',
    long: '-3.118'
  },
  destinations: {
    lat: '53.479549',
    long: ' -2.244002'
  }
}
googleMapsClient.distanceMatrix({
    origins: `${coordinates.origins.lat},${coordinates.origins.long}`,
    destinations: `${coordinates.destinations.lat},${coordinates.destinations.long}`,
    mode: 'driving' //other mode include "walking" , "bicycling", "transit"
  }).asPromise().then((response) => {
    console.log(response)
    
    
  })


  .catch(err => console.log(err));


  
     
