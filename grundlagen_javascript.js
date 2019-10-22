// Erste Aufgabenblatt 22.10.19 Osama Ahmed

// Aufgabe 1
// Eigene Name auf der Konsole ausgeben 

console.log("Osama Ahmed");

// Aufgabe 2 
// Variablen Deklarieren, denen Werte zuweisen und die auf der Konsole ausgeben
const maxBewert = 5;
var anzahlBewert=0;
var currBewert= 0;

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

