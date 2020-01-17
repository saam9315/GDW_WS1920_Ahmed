const express = require('express') ;
const fs = require("fs");
const bodyParser = require('body-parser')
const app = express() ;
var path = require('path');

var usersCount=0;
var ordersCount =0;

class order {
    constructor(ID, kundeID, receivedAt, pizzaType, numPizzas, address, waitTime) {
        this.ID = ID;
        this.kundeID = kundeID;
        this.receivedAt = receivedAt;
        this.pizzaType = pizzaType;
        this.numPizzas = numPizzas;
        this.address = address;
        this.waitTime = waitTime;
    }
}

class user {
    constructor(ID, firstname, lastname, address, phoneNumber) {
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}

class driver {
    constructor(ID, firstname, lastname, address, ordersToDeliver, route) {
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.ordersToDeliver = ordersToDeliver;
        this.route = route;
    }
}

app.use(express.json()) ;

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())


  const readJSON = (pfad,callback) => {
    try{
        fs.readFile(pfad, "utf8", (err,result)=> {
        if(err)
            callback(err)
            else
            callback(null,result);
    });
    }
    catch(error){
        console.log(error);

    }
};

const PORT = process.env.PORT || 3000 ;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Get \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.get('/', (req, res) => res.send('Pizza Gummersbach Online!'));

app.get('/user', (req, res) => {
    /*promiseGoogleAPI.then(function(value) {
        res.send((value).toString());
        routeDuration = value;
      });*/

      
     getUserDatabase(req.body.user.ID).then(user => {
        console.log(user)
        res.send(user);
      });
    
    });

/*  converteAdressToLatLong("Gummersbach, Deutschland").then(lat => {
        console.log(lat)
        res.send(lat.toString());

      }); */
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Post \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/user', (req, res)=>{
   
            addUserUpdateDatabase(req).then(userID => {
                console.log(userID)
                res.send(userID.toString());
              });
      
});

app.post('/order', (req, res)=>{
   
   addOrderUpdateDatabase(req).then(newOrder => {
        /*console.log(resultArray[0])
        console.log(resultArray[1])*/
        console.log(newOrder)
        res.send(newOrder);
      });

       /*promiseWeatherAPI.then(main => {
        res.send(main)
       });*/

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Put \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/user', (req, res)=>{
   
    
    let user1 = new user(
        req.body.user.ID,
        req.body.user.firstname,
        req.body.user.lastname,
        req.body.user.address,
        req.body.user.phoneNumber
    );
    
    console.log(user1.ID);

    updateUserUpdateDatabase(user1).then(user => {
        res.send(user);
      });
    




});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Delete \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/user', (req, res) => {


      deleteUserUpdateDatabase(req.body.user.ID).then(message => {
        console.log(message)
        res.send(message);
      });
      
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Database \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const addOrderUpdateDatabase = function(req) {
    return new Promise(function(resolve, reject) {    
        //console.log(path.join(__dirname, 'users.json'))

        readJSON(path.join(__dirname, 'orders.json'), (err, result) => {
            if (!err){
            try {

            
              
              let weather;
              let newOrder = new order();
            
                newOrder.ID= (ordersCount+1).toString();
                newOrder.kundeID=req.body.order.kundeID;
                newOrder.receivedAt = req.body.order.receivedAt;
                newOrder.pizzaType = req.body.order.pizzaType;
                newOrder.numPizzas = req.body.order.numPizzas;
                newOrder.address = req.body.order.address;
                
                    
            converteAdressToLatLong(req.body.order.address).then(latLng => {

                //console.log(latLng)
                //res.send(lat.toString());
                promiseGoogleAPI(latLng).then(function(routeDuration) {
                    console.log(routeDuration)
                    newOrder.waitTime = routeDuration.toString()
                    resolve(newOrder)
                    console.log(newOrder.waitTime)

                  });
              });
              

            promiseWeatherAPI.then(main => {
                console.log(main);
                weather = main
               });
            
               
                
                 

               
               console.log(weather)

               /*let resultArray = new Array();
               resultArray.push(routeDuration);
               resultArray.push(weather);*/
               
               
               
               /*
                ordersCount ++;
                if (ordersCount ==1){
                    let ordersArray = new Array();
                    ordersArray.push(newOrder);
                    fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(ordersArray), (err) => {
                        if (err) {
                            console.log('Error writing file', err);
                        }
                        else {
                            console.log('Successfully wrote file');
                            resolve();
    
                           
                        }
                    });
                    

                }
                else {
                let usersArray =JSON.parse(result);

                usersArray.push(newUser);

                console.log(usersArray)
                //console.log(JSON.stringify(usersArray));
                fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        
                        console.log('Successfully wrote file');
                            resolve(newUser.ID);

                        
                        
                    }
                });
                
            }
            */ 
        }
            catch (error) {
                console.log(error);
                
            }
         
        }
        else 
            console.log(err)


            
        }); 
        
    })
  }



const deleteUserUpdateDatabase = function(userID) {
    return new Promise(function(resolve, reject) {
        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
                let usersArray = JSON.parse(result);
                for (let i = 0; i < usersArray.length ; i++){
                    if (usersArray[i].ID == userID){
                        usersArray.splice(i,1);
                        try {
                            fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                                if (err) {
                                    console.log('Error writing file', err);
                                    reject(Error("It broke"));
                                }
                                else {
                                    console.log('Successfully updated file');
                                    resolve("Done!");
                                    
                                }
                            });
                        }
                        catch (error){reject(Error("It broke"));}
                        

                    }
                }
                //console.log("User not found");
                //reject(Error("User not found!"));
                }
                
        
            catch (error) {
                reject(Error("User not found!"));
                console.log("User not found");
                
            }
        }
        else 
            console.log(err)
        });

    })
  }



const updateUserUpdateDatabase = function(user) {
    return new Promise(function(resolve, reject) {

        console.log(user);
        
        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
                let usersArray = JSON.parse(result);
                for (let i = 0; i < usersArray.length ; i++){
                    if (usersArray[i].ID == user.ID){
                        usersArray[i].firstname = user.firstname;
                        usersArray[i].lastname = user.lastname;
                        usersArray[i].address = user.address;
                        usersArray[i].phoneNumber = user.phoneNumber;
                        try {
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                            if (err) {
                                console.log('Error writing file', err);
                                reject(Error("It broke"));
                            }
                            else {
                                console.log('Successfully wrote file');
                                resolve(user);
                                
                            }
                        });
                    }
                    catch (error){reject(Error("It broke"));}

                    }
                }
                
                }
                
        
            catch (error) {
                reject(Error("It broke"));
                console.log(error);
                
            }
        }
        else 
            reject(Error("It broke"));
            console.log(err)
        });

    })
  }


const getUserDatabase = function(userID) {
    return new Promise(function(resolve, reject) {
        let requiredUser = new user();
        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
                let usersArray = JSON.parse(result);
                for (let i = 0; i < usersArray.length ; i++){
                    if (usersArray[i].ID == userID){
                        requiredUser.ID = userID;
                        requiredUser.firstname = usersArray[i].firstname;
                        requiredUser.lastname = usersArray[i].lastname;
                        requiredUser.address = usersArray[i].address;
                        requiredUser.phoneNumber = usersArray[i].phoneNumber;

                        resolve(requiredUser);

                    }
                }
                console.log("User not found");
                reject(Error("User not found!"));
                }
                
        
            catch (error) {
                reject(Error("User not found!"));
                console.log("User not found");
                
            }
        }
        else 
            console.log(err)
        });

    })
  }

const addUserUpdateDatabase = function(req) {
    return new Promise(function(resolve, reject) {    
        console.log(path.join(__dirname, 'users.json'))

        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
              
                
                let newUser = new user(
                (usersCount +1 ).toString(),
                req.body.user.firstname,
                req.body.user.lastname,
                req.body.user.address.toString(),
                req.body.user.phoneNumber.toString()
            );
            
            usersCount++;
                if (usersCount ==1){
                    let usersArray = new Array();
                    usersArray.push(newUser);
                    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                        if (err) {
                            console.log('Error writing file', err);
                        }
                        else {
                            console.log('Successfully wrote file');
                            resolve(newUser.ID);
    
                            /*readJSON(path.join(__dirname, 'users.json'), (err, result) => {
                                console.log(result);
                            });*/
                            
                        }
                    });
                    

                }
                else {
                let usersArray =JSON.parse(result);

                usersArray.push(newUser);

                console.log(usersArray)
                //console.log(JSON.stringify(usersArray));
                fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        
                        console.log('Successfully wrote file');
                            resolve(newUser.ID);

                        /*readJSON(path.join(__dirname, 'users.json'), (err, result) => {
                            console.log(result);
                        });*/
                        
                    }
                });
                /*fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(usersArray));
                readJSON(path.join(__dirname, 'users.json'), (err, result) => {
                    console.log(result);
                });*/
               
            }
        }
            catch (error) {
                console.log(error);
                
            }
        }
        else 
            console.log(err)
        });

    })
  }






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // APIs \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const converteAdressToLatLong = function(address) {
    return new Promise(function(resolve, reject) {    


const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBa0pkN9HR04XUDVLvJhxtU6LUoeuTJbV4',
    Promise: Promise
  });
  
  //   * Making a geocode request.
  googleMapsClient.geocode( { address })
    .asPromise()
    .then((response) => {
      //console.log(response.json.results);
      var lat = response.json.results[0].geometry.bounds.northeast.lat;
      var lng = response.json.results[0].geometry.bounds.northeast.lng;

      let latLng = new Array();
      latLng.push(lat);
      latLng.push(lng)

      resolve(latLng)
       // var longitude = response.json.results[0].geometry.location.lng();

        //console.log(latitude);
        //console.log(longitude);
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

});
  }

  const promiseGoogleAPI = function(latLng) {
    return new Promise(function(resolve, reject) {    

  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBa0pkN9HR04XUDVLvJhxtU6LUoeuTJbV4',
    Promise: Promise
  });

    // origin ist immer die Coordinaten vom laden in Gummersbach 
      
      // * Making a distance matrix request.
      const coordinates = {
        origins: {
          lat: '51.0862363',
          long: '7.7136906'
        },
        destinations: {
          lat: latLng[0],
          long: latLng[1]
        }
      }
      googleMapsClient.distanceMatrix({
          origins: `${coordinates.origins.lat},${coordinates.origins.long}`,
          destinations: `${coordinates.destinations.lat},${coordinates.destinations.long}`,
          mode: 'driving' //other mode include "walking" , "bicycling", "transit"
        }).asPromise().then((response) => {
          //console.log(response)
          //console.log(response.json.rows[0].elements[0].duration.value);
          var value = (response.json.rows[0].elements[0].duration.value);
          //console.log(value)
          resolve(value);
        }).catch(err => console.log(err));
      
});
}



const promiseWeatherAPI = new Promise(function(resolve, reject) {    

const request = require('request');

let apiKey = "e39c5eea5885613eaabe5d2d70b9c5af";

let city = "Gummersbach";

let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let result = JSON.parse(body);

    //let message = `It's ${weather.main.temp} degrees in
    //${weather.name}!`;
    resolve(result.weather[0].main);
    


  }
});


    });
      