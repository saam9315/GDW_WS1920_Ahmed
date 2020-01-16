const express = require('express') ;
const fs = require("fs");
const bodyParser = require('body-parser')
const app = express() ;
var path = require('path');

var usersCounter=0;

class bestellung {
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
    constructor(ID, firstname, lastName, address, ordersToDeliver, route) {
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




  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Post \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/user', (req, res)=>{
   
        
            //let usersArray = JSON.parse(result);
            let user1 = new user(
                (usersCounter +1 ).toString(),
                req.body.user.firstname,
                req.body.user.lastname,
                req.body.user.address.toString(),
                req.body.user.phoneNumber.toString()
            );
            usersCounter++;
            console.log(user1.firstname);

            addUserUpdateDatabase(user1).then(userID => {
                console.log(userID)
                res.send(userID.toString());
              });
            


        
      
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Put \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.put('/user', (req, res)=>{
   
        
    //let usersArray = JSON.parse(result);
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

    }).catch(alert);
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

const addUserUpdateDatabase = function(newUser) {
    return new Promise(function(resolve, reject) {    
        console.log(path.join(__dirname, 'users.json'))
        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
              
                
                //console.log(result);
                
                if (usersCounter ==1){
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

 
  const promiseGoogleAPI = new Promise(function(resolve, reject) {

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



