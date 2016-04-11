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
		console.log(name.bold.red+" enters the bus!\n".magenta);
	}
	
	this.busChatter = function(startChatterTrigger,callback){
		fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
			if(err)
				throw err;
			else{		
					var items = readResult.split('\r\n');
					if (items.length>=startChatterTrigger){
						console.log("\nThe students are making noise!".rainbow);
						for (var i=0; i< items.length-1; i++){
							var itemJSON = JSON.parse(items[i].replace(/[\[\]']+/g,''));
							if(itemJSON.detentions<10 && parseFloat(itemJSON.GPA)>2) {
								console.log(itemJSON.name.red.bold+ " says: ".bold.red + itemJSON.catchPhrase.green);
							}
						}
					}
					console.log("\n");
					callback();
			}
		})
	}

	this.removeStudentFromBus = function(name){
		
		fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
		
		if(err)
			throw err;
				else{	
						
						var students = readResult.split('\r\n');
						var who = name;
						if (!who){who="Nobody"};
						
						console.log("\n"+who.bold.red + " was thrown off the bus".bold.black);
							
							if(name){
								fs.writeFile("schoolbus.txt","");//clear out the txt file	
								console.log("The following students are on the bus:".bold.green);
								for (var i=0; i< students.length-1; ++i){

								var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));

								if(name != itemJSON.name) {
								console.log(itemJSON.name);
								fs.appendFile("schoolbus.txt", students[i] + "\r\n", function(err){
										if(err)
											throw err;
									})	
								}
							}
					}
						
				}
		})
	}
}
module.exports = Bus;