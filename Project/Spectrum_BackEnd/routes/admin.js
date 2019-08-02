const express = require('express');
const router = express.Router();


const Employee = require('../models/employee');
const Project = require('../models/project');
const Effors = require('../models/effors')

router.get('/getEmployee', (req, res, next) => {
    Employee.getEmployee((err, employee) => {
        console.log('name:' + ' ' + employee.EmpName)
        if (err) throw err;
        if (!employee) {
            return res.json({ success: false, msg: 'Employee not found' });
        }

        return res.json(employee);
    })
})

router.get('/getProject', (req, res, next) => {
    Project.getProject((err, data) => {

        if (err) throw err;
        if (!data) {
            console.log(':( sad me')
            return res.json({ success: false, msg: 'Employee not found' });
        }
        console.log(':| whats your Problem')
        return res.json(data);
    })
})

router.get('/getEffors', (req, res, next) => {
    Effors.getEffors((err, data) => {

        if (err) throw err;
        if (!data) {
            console.log(':( sad me')
            return res.json({ success: false, msg: 'Employee not found' });
        }
        console.log(':| whats your Problem')
        return res.json(data);
    })
})


// Add Vendor
router.post('/addEmployee', (req, res, next) => {
    console.log("In /admin/addEmployee");
    let newEmployee = new Employee;
    console.log("New Employee Name: " + req.body.EmpName);
    newEmployee.EmpName = req.body.EmpName;
    newEmployee.EmpID = req.body.EmpID;
    newEmployee.EmpEmail = req.body.EmpEmail;
    newEmployee.startDate = req.body.startDate;
    newEmployee.endDate = req.body.endDate;
    newEmployee.primarySkill = req.body.primarySkill;
    newEmployee.secondarySkill = req.body.secondarySkill;
    newEmployee.empBand = req.body.empBand;
    newEmployee.Role = req.body.Role;
    console.log("New Employee: " + JSON.stringify(newEmployee));
    Employee.addEmployee(newEmployee, (err, employee) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Add Employee. Error: ' + err });
        }
        else {
            res.json({ success: true, msg: 'Added Employee Succefully: ' });
        }
    });
});

//Update Vendor
router.put('/editEmployee', (req, res, next) => {
    console.log("In /admin/editEmployee");
    let newEmployee = new Employee;
    newEmployee.EmpName = req.body.EmpName;
    newEmployee.EmpID = req.body.EmpID;
    newEmployee.EmpEmail = req.body.EmpEmail;
    newEmployee.startDate = req.body.startDate;
    newEmployee.endDate = req.body.endDate;
    newEmployee.primarySkill = req.body.primarySkill;
    newEmployee.secondarySkill = req.body.secondarySkill;
    newEmployee.empBand = req.body.empBand;
    newEmployee.Role = req.body.Role;
    Employee.editEmployee(newEmployee, (err, vendor) => {
        //console.log('new' + newVendor.VendorName);
        if (err) {
            res.json({ success: false, msg: 'Failed to Update Employee. Error: ' + err });
        }
        else {
            res.json({ success: true, msg: 'Updated Employee Succefully: ' });
        }
    });
});

router.post('/addProject', (req, res, next) => {
    console.log(req.body.ProjectName);
    let newProject = new Project;
    console.log("New Poject: " + req.body.ProjectName);
    newProject.ProjectCode = req.body.ProjectCode;
    newProject.ProjectName = req.body.ProjectName;
    newProject.ProjectStartDate = req.body.ProjectStartDate;
    newProject.ProjectEndDate = req.body.ProjectEndDate;
    newProject.IsActive = req.body.IsActive;
    newProject.ProjectType = req.body.ProjectType;
    console.log("New Project: " + JSON.stringify(newProject));






    Project.addProject(newProject, (err, project) => {

        if (err) {
            res.json({ success: false, msg: 'Failed to Add Project. Error: ' + err });
        }
        else {
            let newEffort = new Effors;
            console.log("New Effort: " + req.body.ProjectCode);
            newEffort.ProjectID = req.body.ProjectCode;

            Effors.AddEffort(newEffort, (err, efforts) => {
                if (err) {
                    res.json({ success: false, msg: 'Failed to Add Effort. Error: ' + err });
                }
                else {
                    res.json({ success: true, msg: 'Added Effort Succefully: ' });
                }

            })


        }

    });
});
router.post('/AddEffort', (req, res, next) => {
    console.log(req.body.ProjectID);
    let newEffort = new Effors;
    console.log("New Effort: " + req.body.ProjectID);
    newEffort.ProjectID = req.body.ProjectID;
    newEffort.Month = req.body.Month;
    newEffort.Week = req.body.Week;
    newEffort.Efforts = req.body.Efforts;
    console.log("New Effort: " + JSON.stringify(newEffort));
    /// let newEffort = new Effors;
    Effors.AddEffort(newEffort, (err, effort) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Add Effort. Error: ' + err });
        }
        else {
            res.json({ success: true, msg: 'Added Effort Succefully: ' });
        }
    });
});

router.get('/getSingleEmployee/:EmpID', (req, res, next) => {
    console.log("I am here Angel")
    console.log("In /admin/Menu");
    var EmpID = req.params.EmpID;

    Employee.getSingleEmployee(EmpID, (err, employee) => {

        if (err) throw err;
        if (!employee) {
            return res.json({ success: false, msg: 'Employee not found' });
        }

        return res.json(employee);
    });

})

router.put('/AddEmployee', (req, res, next) => {
    console.log("In /Menu/Addcategories");
    var username = req.params.email;
    let Menu = new Vendor;
    let VendorHold = new Vendor;



    Menu.categories = req.body.categories;

    console.log('Menu: ' + JSON.stringify(Menu.categories));

    Vendor.addcategories(username, Menu, (err, vendor) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to Add categories. Error: ' + err });
        }
        else {
            res.json({ success: true, msg: 'Add categories Succefully: ' });
        }

    })

})
module.exports = router;
