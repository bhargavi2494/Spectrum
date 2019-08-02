const mongoose = require('mongoose');
const config = require('../config/database');

//employeed schema

const EmployeeSchema = mongoose.Schema({
    EmpName:{
        type: String,
        require: true
    },
    EmpID:{
        type: String,
        require: true
    },
    EmpEmail:{
        type: String,
        require: true
    },
    startDate:{
        type: String,
        require: true
    },
    endDate:{
        type: String,
        require: false
    },
    primarySkill:{
        type: String,
        require: true
    },
    secondarySkill:{
        type: String,
        require: false
    },
    empBand:{
        type: String,
        require: true
    },
    Role:{
        type: String,
        require:true
    }
});

const Employee = module.exports = mongoose.model('Employee', EmployeeSchema);

module.exports.getEmployee = function(callback){
    console.log('inside the model..');
    Employee.find({}, callback);
}

module.exports.getEmployees = function(callback) {
    Employee.find({}, callback);
  }
  module.exports.addEmployee = function(newEmployee, callback) {
    console.log('Employee' +JSON.stringify( newEmployee));
    newEmployee.save(callback);
  }

  module.exports.getSingleEmployee = function(EmpID, callback){
    const query = {"EmpID": EmpID};
  Employee.findOne(query, callback);
}

module.exports.editEmployee = function(employee, callback){
    const query = {"EmpID": employee.EmpID};

    const EmpName = employee.EmpName;
    const EmpEmail = employee.EmpEmail;
    const startDate = employee.startDate;
    const endDate = employee.endDate;
    const primarySkill = employee.primarySkill;
    const secondarySkill = employee.secondarySkill;
    const empBand = employee.empBand;
    const Role = employee.Role;

    Employee.update(query,{$set: {
        EmpName : EmpName,
        EmpEmail : EmpEmail,
        startDate : startDate,
        endDate : endDate,
        primarySkill : primarySkill,
        secondarySkill : secondarySkill,
        empBand : empBand,
        Role : Role
    }}, callback);

}