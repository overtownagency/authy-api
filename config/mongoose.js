const mongoose = require('mongoose');
const userModel = require('../api/data/models/user');
// const courseModel = require('../models/Course');


module.exports = function (config) {
    const connectionString = process.env.MONGO_CONNECTION_STRING.replace("<user>", process.env.MONGO_USER).replace("<pass>", process.env.MONGO_PASS);
    mongoose.connect( connectionString, { useNewUrlParser: true } ); 
    console.log("MongoDb connected");
    // var db = mongoose.connection;

    // db.on('error', console.error.bind(console, 'connection error...'));
    // db.once('open', function callback() {
    //     console.log('multivision db opened');
    // });

    // userModel.createDefaultUsers();
    // courseModel.createDefaultCourses();
};