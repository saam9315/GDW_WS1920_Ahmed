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

      getUserDatabasePromise(req.body.user.ID).then(user => {
        console.log(user)
        res.send(user);
      });
      
});




  
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Post \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/user', (req, res)=>{
   
        try{
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
            addUserUpdateDatabase(user1);
            res.send(user1)


        }
        catch (error) {
                console.log(error);
                return;
        }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                            // Database \\ 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUserDatabasePromise = function(userID) {
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
                reject(Error("It broke"));
                }
                
        
            catch (error) {
                console.log(error);
                
            }
        }
        else 
            console.log(err)
        });

    });
  }    
function addUserUpdateDatabase(newUser) {
        console.log(path.join(__dirname, 'users.json'))
        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
            if (!err){
            try {
              
                
                //console.log(result);
                
                if (usersCounter ==1){
                    let usersArray = new Array()
                    usersArray.push(newUser);
                    fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(usersArray), (err) => {
                        if (err) {
                            console.log('Error writing file', err);
                        }
                        else {
                            console.log('Successfully wrote file');
    
                            readJSON(path.join(__dirname, 'users.json'), (err, result) => {
                                console.log(result);
                            });
                            
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

                        readJSON(path.join(__dirname, 'users.json'), (err, result) => {
                            console.log(result);
                        });
                        
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
    };






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



