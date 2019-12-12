const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    info : { 
        firstName: {type: String, required: '{PATH} is required'},
        lastName: {type: String, required: '{PATH} is required'},
    },
	// salt: {type: String, required: '{PATH} is required'},
    password: {type: String, required: '{PATH} is required'},
    created: {type: Date },
    lastLogin: {type: Date },
    failedLogins : { type: Number },
    locked: {type : Boolean},
    lastPasswordChange : { type : Date },
    passwordExpiry : { type : Boolean },
    passwordExpiryDate : { type : Date },
    recoveryToken : { type: String }
});

userSchema.methods.create = (firstName, lastName, email, password, passwordExpiry, callback) => {
    User.create({ email : email, info : { firstName : firstName, lastName : lastName }, locked : false, password : password, created : new Date(), passwordExpiry : passwordExpiry, failedLogins : 0 }, function(err, user) {
        return callback(err, user)
    });  
}  

userSchema.methods.getUsers = (callback) => {
    User.find({}).exec(function (err, collection) {
        return callback(err, collection);
    });
}  

userSchema.methods.getUser = (email, callback) => {
    User.findOne({ email : email }).exec(function (err, collection) {
        return callback(err, collection);
    });
}  

userSchema.methods.updateUser = (email, updates, callback) => {
    User.findOneAndUpdate({ email : email }, updates, {upsert:true}, function(err, doc){
        return callback(err, doc)
    });
}  

userSchema.methods.deleteUser = (email, callback) => {
    User.deleteOne({ email : email }).exec(function (err, collection) {
        return callback(err, collection);
    });
}  

var User = mongoose.model('User', userSchema);
module.exports = mongoose.model('User');