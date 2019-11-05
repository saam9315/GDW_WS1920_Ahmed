// dritte Aufgabenblatt 04.11.19 Osama Ahmed
// Aufgabenblatt 3

// Aufgabe 2

const fs = require("fs");

//Reading a json file

const readJSON = (pfad,callback) => {
    fs.readFile(pfad, 'utf8', callback);
};


module.exports ={readJSON};



readJSON('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json',(err,result)=>{

});

var cities;


const findAndDelete = (pfad, name)=>{
    readJSON(pfad, (err,result) =>{
        if (err){
            console.log("File read failed:",err);
        return;
        }
        cities = JSON.parse(result);
        for(let i=0;i<cities.length;i++) {
            if(cities[i].name == name){
                cities.splice(i,1);
                
            }
        }

        for(let i=0;i<cities.length;i++) {
            console.log(cities[i].name);
        }
       
        
    });

    fs.writeFile('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json', JSON.stringify(cities), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
    

};





//findAndDelete('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json',"Leipzig");

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const addCity = (pfad)=>{
    readJSON(pfad, (err,result) =>{
        if (err){
            console.log("File read failed:",err);
        return;
        }
        cities = JSON.parse(result);
        
        rl.question("Bitte geben Sie den Stadtnamen ein: ", function(answer){
            rl.question("Bitte geben Sie die Einwohnerzahl ein: ", function(answer2){
                rl.question("Bitte geben Sie das Bundesland ein: ", function(answer3){
                    let newCity = {
                        "name": answer,
                        "rank":cities.length,
                        "einwohnerzahl":answer2,
                        "bundesland": answer3
                    }
                    cities.push(newCity);
                    for(let i=0;i<cities.length;i++) {
                        console.log(cities[i].name);
                    }
                    rl.close();

                });
            });
        });
            
    });
        
    };




addCity('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json');

/*readJSON('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json', (err, result) => {
    console.log(result); // JSON Daten ...});

});*/

module.exports = {
    findAndDelete
};

//Aufgabe 3



/*

const readJSON = (pfad,callback) => {
    fs.readFile(pfad, 'utf8' ,(err,jsonString) => {
    if (err){
        console.log("File read failed:",err);
        return;
    }
    try {
        const cities = JSON.parse(jsonString);
    } catch (err){
        console.log('Error parsing File!', err);
    }
    //console.log("Cities are: ", jsonString);
})
};

*/