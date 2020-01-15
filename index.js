const express = require('express') ;
const bodyParser = require('body-parser')
const app = express() ;


app.use(express.json()) ;

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())


const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

app.get('/', (req, res) => res.send('Hello World!'));





app.post('/user', (req, res) => {
    promise1.then(function(value) {
        res.send(value.toString());
        // expected output: "foo"
      });
    
      
  });



 
  const promise1 = new Promise(function(resolve, reject) {

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
          //console.log(response)
          //console.log(response.json.rows[0].elements[0].duration.value);
          var value = (response.json.rows[0].elements[0].duration.value) +1;
          //console.log(value)
          resolve(value);
        })
      
      
        .catch(err => console.log(err));
      
      
        
           
      
  });
  
  
  
  //console.log(promise1);
  // expected output: [object Promise]



