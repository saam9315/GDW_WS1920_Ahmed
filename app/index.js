/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Requires \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express') ;
const fs = require("fs");
const bodyParser = require('body-parser')
const app = express() ;
var path = require('path');



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Objects and Variables \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var usersCount=0;
var ordersCount =0;

class order {
    constructor(ID, kundeID, receivedAt, pizzaType, numPizzas, address, waitTime, url) {
        this.ID = ID;
        this.kundeID = kundeID;
        this.receivedAt = receivedAt;
        this.pizzaType = pizzaType;
        this.numPizzas = numPizzas;
        this.address = address;
        this.waitTime = waitTime;
        this.url = url
    }
}

class user {
    constructor(ID, firstname, lastname, address, phoneNumber, url) {
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.url = url
    }
}

class driver {
    constructor(ID, firstname, lastname, address, ordersToDeliver, route, url) {
        this.ID = ID;
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.ordersToDeliver = ordersToDeliver;
        this.route = route;
        this.url = url
    }
}

app.use(express.json()) ;

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  app.use(bodyParser.json())

//methode zu lesen einer Json Datei 
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Get \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.get('/', (req, res) => res.send('Pizza Gummersbach Online!'));

app.get('/user/:user_id', (req, res) => {

     getUserDatabase(req.params.user_id).then(function (user) {
        console.log(user)
        res.status(200).json(user);

      }, function (error){
        res.status(404).send(error)
    }
      );

    });

    app.get('/order/:order_id', (req, res) => {

        getOrderDatabase(req.params.order_id).then(function (order) {
           //console.log(user)
           res.status(200).json(order);
   
         }, function (error){
           res.status(404).send(error)
       }
         );
   
       });
   
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Post \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/user', (req, res)=>{
   
              addUserUpdateDatabase(req).then(function (user) {
                //console.log(user)
                res.status(201).json(user);
        
              }, function (error){
                res.status(500).send(error)
            }
              );          
      
});

app.post('/order', (req, res)=>{
   
     addOrderUpdateDatabase(req).then(function (newOrder) {
        //console.log(user)
        res.status(201).send(newOrder);

      }, function (error){
        res.status(500).send(error)
    }
      );  

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Put \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/user/:user_id', (req, res)=>{
    let user1 = new user(
        req.params.user_id,
        req.body.user.firstname,
        req.body.user.lastname,
        req.body.user.address,
        req.body.user.phoneNumber
    );
    
    updateUserUpdateDatabase(user1).then(function (user) {
        //console.log(user)
        res.status(200).send(user);;

      }, function (error){
        res.status(500).send(error)
    }
      );    

});



app.put('/order/:order_id', (req, res)=>{
    let order1 = new order();

        order1.ID = req.params.order_id,
        order1.pizzaType = req.body.order.pizzaType,
        order1.numPizzas = req.body.order.numPizzas,

    updateOrderUpdateDatabase(order1).then(function (order) {
        res.status(200).send(order);;

      }, function (error){
        res.status(500).send(error)
    }
      );    

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Delete \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/user', (req, res) => {

      deleteUserUpdateDatabase(req.body.user.ID).then(function (message) {
        res.status(200).send(message);

      }, function (error){
        res.status(500).send(error)
    }
      ); 
      
});

app.delete('/order/:order_id', (req, res) => {

    deleteOrderUpdateDatabase(req.params.order_id).then(function (message) {
      res.status(200).send(message);

    }, function (error){
      res.status(500).send(error)
  }
    ); 
    
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Database \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////// User methoden ///////////////////////////////////////////////////////////////////////


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
                                    return resolve("Done!");
                                    
                                }
                            });
                        }
                        catch (error){reject(Error("It broke"));}
                        

                    }
                }
            }
                
        
            catch (error) {
                return reject(new Error("User not found!"));
                //console.log("User not found");
                
            }
        }
        else 
            return reject(new Error("User not found!"));
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
                        user.url = usersArray[i].url
                        try {
                        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                            if (err) {
                                console.log('Error writing file', err);
                                reject(Error("It broke"));
                            }
                            else {
                                console.log('Successfully wrote file');
                                return resolve(user);
                                
                            }
                        });
                    }
                    catch (error){reject(Error("It broke"));}

                    }
                }
                
                }
                
        
            catch (error) {
                return reject(Error("It broke"));
                //console.log(error);
                
            }
        }
        else 
            return reject(Error("It broke"));
            //console.log(err)
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

                       return resolve(requiredUser);

                    }
                }
                
                return reject(new Error("User not found!"));
                
            }
                
        
                catch (error) {
                return reject(new Error("internal Server Error"));
                
                }
            }   
        else 
        return reject(new Error("internal Server Error"));
        });

    })
  }

const addUserUpdateDatabase = function(req) {
    return new Promise(function(resolve, reject) {    
       // console.log(path.join(__dirname, 'users.json'))

        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
              
            
                let newUser = new user(
                (usersCount + 1).toString(),
                req.body.user.firstname,
                req.body.user.lastname,
                req.body.user.address.toString(),
                req.body.user.phoneNumber.toString(),
                "http://localhost:5000/user/"+ (usersCount + 1).toString()
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
                            return resolve(newUser);

                            
                        }
                    });
                    

                }
                else {
                let usersArray =JSON.parse(result);
                
                for (let i = 0; i < usersArray.length ; i++){
                    if (usersArray[i].firstname == newUser.firstname 
                        && usersArray[i].lastname == newUser.lastname 
                        && usersArray[i].address == newUser.address){
                        usersCount--;
                        console.log("they are equal!!!!!")
                        newUser.ID = usersArray[i].ID
                        newUser.phoneNumber = usersArray[i].phoneNumber

                        return resolve(newUser);
                }

            }
                console.log("i still came here!!!!")
                usersArray.push(newUser);

                //console.log(usersArray)
                fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        
                        console.log('Successfully wrote file');
                           return resolve(newUser);

                    
                        
                    }
                });
               
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

////////////////////////////////////////////////////////////////// Order methoden ///////////////////////////////////////////////////////////////////////


const updateOrderUpdateDatabase = function(order) {
    return new Promise(function(resolve, reject) {

        //console.log(order);
        
        readJSON(path.join(__dirname, 'orders.json'), (err, result) => {
            if (!err){
            try {
                let ordersArray = JSON.parse(result);
                for (let i = 0; i < ordersArray.length ; i++){
                    if (ordersArray[i].ID == order.ID){
                        ordersArray[i].pizzaType = order.pizzaType;
                        ordersArray[i].numPizzas = order.numPizzas;
                        order.kundeID = ordersArray[i].kundeID
                        order.receivedAt = ordersArray[i].receivedAt
                        order.address = ordersArray[i].address
                        order.waitTime = ordersArray[i].waitTime
                        order.url = ordersArray[i].url
                        try {
                        fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(ordersArray), (err) => {
                            if (err) {
                                console.log('Error writing file', err);
                                reject(Error("It broke"));
                            }
                            else {
                                console.log('Successfully wrote file');
                                return resolve(order);
                                
                            }
                        });
                    }
                    catch (error){reject(Error("It broke"));}

                    }
                }
                
                }
                
        
            catch (error) {
                return reject(Error("It broke"));
                //console.log(error);
                
            }
        }
        else 
            return reject(Error("It broke"));
            //console.log(err)
        });

    })
  }

const getOrderDatabase = function(orderID) {
    return new Promise(function(resolve, reject) {
        let requiredOrder = new order();
        readJSON(path.join(__dirname, 'orders.json'), (err, result) => {
            if (!err){
            try {
                let ordersArray = JSON.parse(result);
                for (let i = 0; i < ordersArray.length ; i++){
                    if (ordersArray[i].ID == orderID){
                        requiredOrder.ID = orderID; 
                        requiredOrder.kundeID = ordersArray[i].kundeID;
                        requiredOrder.receivedAt = ordersArray[i].receivedAt;
                        requiredOrder.pizzaType = ordersArray[i].pizzaType;
                        requiredOrder.numPizzas = ordersArray[i].numPizzas;
                        requiredOrder.address = ordersArray[i].address;
                        requiredOrder.waitTime = ordersArray[i].waitTime;


                       return resolve(requiredOrder);

                    }
                }
                //res.status(404).send("User not found")
                return reject(new Error("Order not found!"));
                // console.log("User not found");
                
                }
                
        
            catch (error) {
                return reject(new Error("internal Server Error"));
                //console.log("User not found");
                
            }
        }
        else 
        return reject(new Error("internal Server Error"));
        });

    })
  }

const addOrderUpdateDatabase = function(req) {
    return new Promise(function(resolve, reject) {    
        //console.log(path.join(__dirname, 'users.json'))

        readJSON(path.join(__dirname, 'orders.json'), (err, result) => {
            if (!err){
            try {

            
              
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              let newOrder = new order();
                
                newOrder.ID= (ordersCount+1).toString();
                newOrder.kundeID=req.body.order.kundeID;
                newOrder.receivedAt = time;
                newOrder.pizzaType = req.body.order.pizzaType;
                newOrder.numPizzas = req.body.order.numPizzas;
                newOrder.address = req.body.order.address;
                newOrder.url = "http://localhost:5000/order/"+ (ordersCount + 1).toString()
                
                ordersCount ++;       
            converteAdressToLatLong(req.body.order.address).then(latLng => {

                promiseGoogleAPI(latLng).then(function(routeDurationInSecond) {
                    let weather;
                    promiseWeatherAPI.then(main => {
                        //console.log(main);
                        weather = main


                        let minutes= 60; // second
                       console.log(weather)
                       if (weather.localeCompare("Snow") == 0  || weather.localeCompare("Rain") == 0){
                        
                        newOrder.waitTime = (Math.floor(routeDurationInSecond/minutes) + 10).toString() + " Minutes"
                       }
                       else
                    newOrder.waitTime = (Math.floor(routeDurationInSecond/minutes)).toString() + " Minutes"
                    
                   
                if (ordersCount ==1){
                    let ordersArray = new Array();
                    ordersArray.push(newOrder);
                    fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(ordersArray), (err) => {
                        if (err) {
                            console.log('Error writing file', err);
                        }
                        else {
                            console.log('Successfully wrote file');
                            resolve(newOrder)
    
                           
                        }
                    });
                    

                }
                else {
                let ordersArray =JSON.parse(result);

                ordersArray.push(newOrder);

                fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(ordersArray), (err) => {
                    if (err) {
                        console.log('Error writing file', err);
                    }
                    else {
                        
                        console.log('Successfully wrote file');
                        resolve(newOrder)

                        
                        
                    }
                });
                
            }

                  });
                });
              });
   

        }
            catch (error) {
                return reject(new Error("Internal Server Error"));
                
            }
         
        }
        else 
        return reject(new Error("Internal Server Error"));


            
        }); 
        
    })
  }

const deleteOrderUpdateDatabase = function(orderID) {
    return new Promise(function(resolve, reject) {
        readJSON(path.join(__dirname, 'orders.json'), (err, result) => {
            if (!err){
            try {
                let ordersArray = JSON.parse(result);
                for (let i = 0; i < ordersArray.length ; i++){
                    if (ordersArray[i].ID == orderID){
                        ordersArray.splice(i,1);
                        try {
                            fs.writeFile(path.join(__dirname, 'orders.json'), JSON.stringify(ordersArray), (err) => {
                                if (err) {
                                    console.log('Error writing file', err);
                                    return reject(new Error("Internal Server Error!"));
                                }
                                else {
                                    console.log('Successfully updated file');
                                    return resolve("Order Deleted!");
                                    
                                }
                            });
                        }
                        catch (error){console.log('Error writing file', err);
                        return reject(new Error("Internal Server Error!"));}
                        

                    }
                }
               
            }
            catch (error) {
                return reject(new Error("User not found!"));
    
                
            }
        }
        else 
            return reject(new Error("User not found!"));
        });

    })
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // APIs \\ 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

      return resolve(latLng)
   
    })
    .catch((err) => {
      console.log(err);
    });
  

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
          var value = (response.json.rows[0].elements[0].duration.value);
          
         return resolve(value);
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

    resolve(result.weather[0].main);
    
  }
});


    });
      