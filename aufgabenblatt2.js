//Aufgabenblatt 2

const maxBewert = 5;
var anzahlBewert=0;
var sumeBewert=0;
var currBewert= 0;
var lastBewert=0;

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
	firstName: "Anton",
	lastName: "notnA",
	age: 23
};

console.log(person.firstName, person.lastName);


function student (firstName, lastName, age){
	this.firstName=firstName;
	this.lastName=lastName;
	this.age=age;
};

let anton = new student ("Anton", "notnA", 23);

console.log(anton.firstName, anton.lastName, anton.age);

const parseName = name =>{ 
	let split = name.split(" ");
	return {
		firstName:split[0],
		lastName:split[1]
	};
};


let st = parseName("Anton notnA");

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




