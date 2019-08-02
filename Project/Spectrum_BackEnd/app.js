const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

//for gridfs file upload

const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const MongoClient = require('mongodb').MongoClient;

mongoose.connect(config.database, { useNewUrlParser: true });
//MongoClient.connect(config.database).then(client => client.db)

mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
    //var gfs = Grid(conn.db);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();


const admin = require('./routes/admin');

const port = 3000;

app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/admin', admin);

// Order routes

// Index Route
app.get('/', (req, res) => {
    res.send('<h1>VFC APIs</h1> <p>'+
                '<b><u>admin - Vendors</u></b><p>' +
                'GET /admin/getVendors<br>' +
                'DELETE /admin/deleteVendor<br>' +
                'POST /admin/addVendor<br>' +
                'GET /admin/getVendor/:id<br>' +
                'PUT /admin/updateVendor/:id'
            );

    //res.render('index');
});


app.listen(port, () => {
    console.log('Server started on port: ', + port);
});

//Init gfs



