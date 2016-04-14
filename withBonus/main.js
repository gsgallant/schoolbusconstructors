var prompt = require('prompt');
var Student = require('./student.js');
var Bus = require('./bus.js');
var fs = require('fs');


var startChatterTrigger = 20;///used a variable because I used this for testing and set it to a small number.  HW requires 20 
var newBus = new Bus();

newBus.stillOnBus(function(){

	console.log("Who would you like to add? <No Entry => Nobody>");
	prompt.start();
		
	prompt.get(['name','gender','grade','GPA','detentions','sleepingInClass','catchPhrase'],function(err,result){
			
			if (result.name){
				var newStudent = new Student(result.name,result.gender,result.grade,result.GPA,result.detentions,result.sleepingInClass,result.catchPhrase);

				newStudent.canStudentHaveFun();

				newBus.studentEntersBus(result.name,result.gender,result.grade,result.GPA,result.detentions,result.sleepingInClass,result.catchPhrase);

			}
				
				newBus.busChatter(startChatterTrigger,function(){
						console.log("Who would you like to remove from the bus? <No Entry => Nobody>")
						prompt.start();
						
						prompt.get(['name'],function(err,result){
						if(!err){
								newBus.removeStudentFromBus(result.name);
								}else{
									throw err;
								}
						})
				})
	})

})