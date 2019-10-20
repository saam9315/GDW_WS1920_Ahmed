const maxBewert = 5;
var anzahlBewert=0;
var sumeBewert=0;
var currBewert= 0;



console.log("Max Bewertung ist: "+maxBewert+ '\n'+
			"Anzahl Bewetungen: "+anzahlBewert+ '\n'+
			"Aktuelle Bewertung: "+currBewert + '\n'+ sumeBewert );



const readline = require('readline');
const rl = readline.createInterface({
		input: process.stdin,
		output:process.stdout
});

var bewert = function (){
	rl.question("Bitte geben Sie eine Bewertung ein ", function(answer){
		if(answer>5 || answer<0)
			return rl.close();
		

			anzahlBewert++;
			sumeBewert +=1*answer;
			currBewert= sumeBewert /anzahlBewert;
			
		
			console.log("Max Bewertung ist: "+maxBewert+ '\n'+
					"Anzahl Bewetungen: "+anzahlBewert+ '\n'+
					"Aktuelle Bewertung: "+currBewert + '\n'+ sumeBewert);

			bewert();	
		
					

		});
};
bewert();
	

/*rl.question("Bitte geben sie die Anzahl der Bewertungen ein", (answer)=>{
	anzahlBewert= answer
	rl.close();
});
rl.question("Bitte geben sie die aktuelle Bewertung ein", (answer)=>{
	currBewert= answer
	rl.close();
});*/


