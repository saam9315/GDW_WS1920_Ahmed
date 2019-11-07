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


// Aufgabe 5 
// Eine Funktion zur Berechnung 
var berechnen = function(bewertung){

    anzahlBewert++;
			sumeBewert +=1*bewertung;
			currBewert= sumeBewert /anzahlBewert;
			lastBewert= angegBewert;

}

