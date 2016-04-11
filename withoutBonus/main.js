var prompt = require('prompt');
var Student = require('./student.js');
var Bus = require('./bus.js');
var fs = require('fs');


var startChatterTrigger = 20;///used a variable because I used this for testing and set it to a small number.  HW requires 20 
var newBus = new Bus();

prompt.start();

prompt.get(['name','gender','grade','GPA','detentions','sleepingInClass','catchPhrase'],function(err,result){

var newStudent = new Student(result.name,result.gender,result.grade,result.GPA,result.detentions,result.sleepingInClass,result.catchPhrase);

newStudent.canStudentHaveFun();

newBus.studentEntersBus(result.name,result.gender,result.grade,result.GPA,result.detentions,result.sleepingInClass,result.catchPhrase);

fs.appendFile("schoolbus.txt", JSON.stringify(newBus.studentsOnTheBus) + "\r\n", function(err){
		if(err)
			throw err;
	})

//check to see if there are at least 20 students in schoolbus.txt
fs.readFile("schoolbus.txt", "utf-8", function(err, readResult){
		if(err)
			throw err;
		else{		
				var items = readResult.split('\r\n');
				if (items.length>=startChatterTrigger){
					//Begin the bus chatter if there are at least (startChatterTrigger)# of students in schoolbus.txt
						newBus.busChatter();
				}
		}
	})



});

