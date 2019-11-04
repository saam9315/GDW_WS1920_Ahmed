// Erste Aufgabenblatt 22.10.19 Osama Ahmed

// Aufgabe 1
// Eigene Name auf der Konsole ausgeben 

// console.log("Osama Ahmed");

// Aufgabe 2 
// Variablen Deklarieren, denen Werte zuweisen und die auf der Konsole ausgeben
const maxBewert = 5;
var anzahlBewert=0;
var sumeBewert=0;
var currBewert= 0;
var lastBewert=0;

/* comment start 

currBewert = 4;
anzahlBewert = 2;

console.log("Max Bewertung ist: "+maxBewert+ '\n'+
			"Anzahl Bewertungen: "+anzahlBewert+ '\n'+
            "Aktuelle Bewertung: "+currBewert );
            
// maxBewert = 4;   Error: Assignment to constant variable.



currBewert = "sehr Gut"; // JavaScript variables are loosely-typed which means it does not require a data type to be declared

console.log("Max Bewertung ist: "+maxBewert+ '\n'+
			"Anzahl Bewertungen: "+anzahlBewert+ '\n'+
            "Aktuelle Bewertung: "+currBewert );

anzahlBewert =0;
currBewert =0;    

// Aufgabe 4 
// Random Werte n mal berechnen 
var i = 0;
while (i < 3){
    var angegBewert= Math.ceil(Math.random() * 5);
    anzahlBewert++;
			sumeBewert += angegBewert;
			currBewert= sumeBewert /anzahlBewert;
			lastBewert= angegBewert;
			
		
			console.log("angegebene Bewertung ist: "+ angegBewert+ '\n'+
					"Anzahl Bewetungen: "+anzahlBewert+ '\n'+
					"Aktuelle Bewertung: "+currBewert);
            
                    i++;
 
} 

// Aufgabe 3
// Bewertungen vom User einlesen und entsprechnde Werte ändern

// Scanner einlegen
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var bewert = function (){
	rl.question("Bitte geben Sie eine Bewertung ein ", function(answer){
		if(answer> maxBewert || answer<0 || answer == 0)
			return rl.close();
		

			berechnen(answer);
			
		
			console.log("Max Bewertung ist: "+maxBewert+ '\n'+
					"Anzahl Bewetungen: "+anzahlBewert+ '\n'+
					"Aktuelle Bewertung: "+currBewert + '\n'+ sumeBewert);

			bewert();	
		
					

		});
};
bewert();

Comment end*/

// Aufgabe 5 
// Eine Funktion zur Berechnung 
var berechnen = function(bewertung){

    anzahlBewert++;
			sumeBewert +=1*bewertung;
			currBewert= sumeBewert /anzahlBewert;
			lastBewert= angegBewert;

}


//Aufgabenblatt 2

let games = ["bfv","COD","RS"];

console.log(games.length);

games.forEach(function(item,index, array){
console.log(item,index);
});

games.push("Borderlands");


games.forEach(function(item,index, array){
    console.log(item,index);
    });

games.pop();

games.forEach(function(item,index, array){
    console.log(item,index);
	});
	
let person = {
	firstName: "Osama",
	lastName: "Ahmed",
	age: 23
};

console.log(person.firstName, person.lastName);


function student (firstName, lastName, age){
	this.firstName=firstName;
	this.lastName=lastName;
	this.age=age;
};

let osama = new student ("Osama", "Ahmed", 23);

console.log(osama.firstName, osama.lastName, osama.age);

const parseName = name =>{ 
	let split = name.split(" ");
	return {
		firstName:split[0],
		lastName:split[1]
	};
};


let st = parseName("Osama Ahmed");

console.log(st.firstName, st.lastName);

//Aufgabe 1
let bewertungInfo = ["Bewertung 1", anzahlBewert, lastBewert];

console.log(bewertungInfo.length, bewertungInfo[bewertungInfo.length-1]);


//Aufgabe 2, 3, 4

function Ratings (name, anzahlBestimmungen, sum, aktuelleBewert){
	this.name = name;
	this.anzahlBestimmungen=anzahlBestimmungen;
	this.sum = sum;
	this.aktuelleBewert=0;
	this.durchschnitt = () => {
		return this.sum/this.anzahlBestimmungen;
			 

	};
};


let rating1 = new Ratings("App1",5,25,0);

console.log(rating1.name, rating1.anzahlBestimmungen, rating1.sum, rating1.durchschnitt());


//Aufgaben 5

const hello = "hello";

function world () {
	const world = "world";

	var satz = hello.concat(" ",world);

	console.log(satz);
};


world();


function two (){
	
	console.log( world.concat(" ",hello)); 
};

 //two(); // error cause world is defined within function hello scope



