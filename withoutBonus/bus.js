var Student = require('./student.js');
var fs = require('fs');
var colors=require('colors');

var Bus = function(studentsOnTheBus,driverName,color,gas){
	this.studentsOnTheBus = [];
	this.driverName = driverName;
	this.color = color;
	this.gas = gas;
	this.studentEntersBus = function(name,gender,grade,GPA,detentions,sleepingInClass,catchPhrase){
		this.studentsOnTheBus.push(new Student(name,gender,grade,GPA,detentions,sleepingInClass,catchPhrase));
	}
	
	this.busChatter = function(){
		fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
		if(err)
			throw err;
		else{		
				var items = readResult.split('\r\n');
				for (var i=0; i< items.length-1; i++){
					var itemJSON = JSON.parse(items[i].replace(/[\[\]']+/g,''));
					if(itemJSON.detentions<10 && parseFloat(itemJSON.GPA)>2) {
						console.log(itemJSON.name.red.bold+ " says: ".bold.magenta + itemJSON.catchPhrase.rainbow);
					}
				}
		}
	})
	}
}

module.exports = Bus;