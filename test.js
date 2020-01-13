const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBa0pkN9HR04XUDVLvJhxtU6LUoeuTJbV4',
  Promise: Promise
});


// * Making a directions request.
googleMapsClient.directions({
  origin: 'Town Hall, Sydney, NSW',
  destination: 'Parramatta, NSW',
}).asPromise().then((response) => {
  console.log(response.json)
})
.catch(err => console.log(err));