const mongoose = require('mongoose');
const config = require('../config/database');

//employeed schema
const EfforsSchema = mongoose.Schema({
    ResourceID:{
        type: String,
        require: false
    },
    ProjectID:{
        type: String,
        require: true
    },
    Month:{
        type: String,
        require: true
    },
    Week:{
        type: String,
        require: true
    },
    Efforts:{
        type: String,
        require: true
    }
});
// var myConnection = Mongoose.createConnection('mongodb://spec:divya123@ds125994.mlab.com:25994/spectrum02', 'project');
mongoose.connect(config.database, { useNewUrlParser: true });
const efforsCollection = module.exports = mongoose.model('efforsCollection', EfforsSchema);

module.exports.getEffors = function(callback){
    console.log('inside the model..');
    efforsCollection.find({}, callback);
}

module.exports.AddEffort = function(newEffort, callback) {
    console.log('Effort' +JSON.stringify( newEffort));
    newEffort.save(callback);
  }

// module.exports.create({
//     ResourseID: "12345",
//     ProjectID: "1",
//     Month: "Jan",
//     Week: "1",
//     Efforts: "40"
// })

// exports.getProjects = function(ProjectSchema) {
//     return function(req, res) {
//       User.find({}, function(error, users) {
//         res.render('list_users', { users : users });
//       });
//     }
//   };
