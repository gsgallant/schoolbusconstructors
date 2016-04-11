var colors=require('colors');

var Student = function(name,gender,grade,GPA,detentions,sleepingInClass,catchPhrase){
		this.name = name;
		this.gender = gender;
		this.grade = grade;
		this.GPA = GPA;
		this.detentions = detentions;
		this.sleepingInClass = sleepingInClass;
		this.catchPhrase = catchPhrase;

		this.canStudentHaveFun = function(){
			if(this.detentions<10 && parseFloat(this.GPA)>2){
				console.log("\n"+this.name.bold.red+" can have fun!\n".bold.green);
			}
		}	
}



module.exports = Student;