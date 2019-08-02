const mongoose = require('mongoose');
const config = require('../config/database');

//employeed schema
const ResourceSchema = mongoose.Schema({
    ResourceID:{
        type: String,
        require: false
    },
    ResourceName:{
        type: String,
        require: true
    },
});
// var myConnection = Mongoose.createConnection('mongodb://spec:divya123@ds125994.mlab.com:25994/spectrum02', 'project');
mongoose.connect(config.database, { useNewUrlParser: true });
const ProjectSchema = mongoose.Schema({
    ProjectCode:{
        type: String,
        require: true
    },
    ProjectName:{
        type: String,
        require: true
    },
    ProjectStartDate:{
        type: String,
        require: true
    },
    ProjectEndDate:{
        type: String,
        require: true
    },
    IsActive:{
        type: String,
        require: false
    },
    ProjectType:{
        type: String,
        require: false
    },
    Resource: [ResourceSchema]
    
});

const project = module.exports = mongoose.model('project01', ProjectSchema);

module.exports.getProject = function(callback){
    console.log('inside the model..');
    project.find({}, callback);
}

module.exports.addProject = function(newProject, callback) {
    console.log('Project' +JSON.stringify( newProject));
    newProject.save(callback);
  }

// module.exports.create({
//     ProjectCode: "1",
//     ProjectName: "ESU",
//     ProjectStartDate: "2019-01-12",
//     ProjectEndDate: "2019-10-13",
//     IsActive: "true",
//     ProjectType: "FixedPrice",
//     Resource:[{
//         ResourceName: "Bhargavi",
//         ResourceID: "1235"
//     }
       
//     ]
// })

// exports.getProjects = function(ProjectSchema) {
//     return function(req, res) {
//       User.find({}, function(error, users) {
//         res.render('list_users', { users : users });
//       });
//     }
//   };
