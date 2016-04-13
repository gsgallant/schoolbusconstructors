var Student = require('./student.js');
var fs = require('fs');
var colors=require('colors');

function studentsStillOnBus(){
			fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
					if(err)
						throw err;
							else{	
									var students = readResult.split('\r\n');
						for (var i=0; i< students.length-1; i++){
							var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));
								if(i%7==0){console.log("");}
								process.stdout.write(itemJSON.name.bold.red);
								if(i<students.length-2){process.stdout.write(", ");}
								// console.log(itemJSON.name.bold.red);
						}
						console.log("\n");
					}
			})
}
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
					if (students.length>=startChatterTrigger){
						console.log("\nThe students are making noise!".red.bold);
						for (var i=0; i< students.length-1; i++){
							var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));
							if(itemJSON.detentions<10 && parseFloat(itemJSON.GPA)>2) {
								console.log(itemJSON.name.red.bold+ " says: ".bold.red + itemJSON.catchPhrase.green);
							}else{
								console.log(itemJSON.name.red.bold+ " MUST STAY **QUIET!!**".bold.red);
							}
						}
					}else{
						console.log("\nThese students are on the bus".green);
						studentsStillOnBus();
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
							if (!who){
								who="Nobody"
								console.log("\n"+who.bold.red + " was thrown off the bus".red);
								};
								if(name){
									fs.writeFile("schoolbus.txt","");//clear out the txt file	
									console.log("The following students are still on the bus:".bold.green);
									for (var i=0; i< students.length-1; ++i){

										var itemJSON = JSON.parse(students[i].replace(/[\[\]']+/g,''));

										if(name != itemJSON.name) {
										console.log(itemJSON.name.bold.red);
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
								}else{ 
										console.log("\nThese students are still on the bus".green);
										studentsStillOnBus();
									}		
							}
			})
	}
}
module.exports = Bus;
