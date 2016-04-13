var Student = require('./student.js');
var fs = require('fs');
var colors=require('colors');
var pad = require('pad');


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
					var students = readResult.split('\r\n');
					if (students.length-1>=startChatterTrigger){
						console.log("\nThe students are making noise!".red.bold);
						for (var i=0; i< students.length-1; i++){
							var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));
							if(itemJSON.detentions<10 && parseFloat(itemJSON.GPA)>2) {
								console.log(itemJSON.name.red.bold+ " says: ".bold.red + itemJSON.catchPhrase.green);
							}else{
								console.log(itemJSON.name.red.bold+ " MUST STAY **QUIET!!**".bold.red);
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
							var nameRemoved = false;
							if (!name){
								console.log("\nNobody".bold.red + " was thrown off the bus".red);
								};
							if(name){
									fs.writeFile("schoolbus.txt","");//clear out the txt file	
									for (var i=0; i< students.length-1; ++i){

										var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));

										if(name != itemJSON.name) {
										fs.appendFile("schoolbus.txt", students[i] + "\r\n", function(err){
												if(err)
													throw err;
											})	
										}else{
											nameRemoved = true;
										}
									}
									if(nameRemoved){console.log("\n"+name.bold.red + " was thrown off the bus".red);

									}else{
										console.log("\n"+name.bold.red + " was NOT ON the bus".red);
									}
								}
						}
			})
	}

	this.stillOnBus = function(callback){
				fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
						if(err)
							throw err;
								else{	
									var students = readResult.split('\r\n');
									console.log("\nThese students are on the bus");
									for (var i=0; i< students.length-1; i++){
										var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));
										
										var displayText = pad(itemJSON.name,10);

										if(i%5==0){console.log("");}
										process.stdout.write(displayText.bold.red);
										// if(i<students.length-2){process.stdout.write(", ".red);}
									}
								console.log("\n");
								callback();
						}
				})
	}

}
module.exports = Bus;
