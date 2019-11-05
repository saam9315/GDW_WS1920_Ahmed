const file = require('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/aufgabenblatt3.js');

file.findAndDelete('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json',"Leipzig");


const fs = require("fs");

const readJSON = (pfad,callback) => {
    fs.readFile(pfad, 'utf8', callback);
};

//file.addCity('/Users/Sam 1/Desktop/GDW/GDW_WS1920_Ahmed_Kolesnikov_Heinlein/cities.json');

