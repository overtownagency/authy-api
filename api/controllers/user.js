
exports.createUser = async function (req, res) {
    var users = new require('../data/models/user')();

    //hash password first
    const encrypt = require('../modules/encrypt');
    encrypt.hashPassword(req.body.password, function(hash, error) {
        if(error) {
            console.log(hashResult.error);
            return res.send({ success: false, error: "Error creating user" });
        }
    
        users.create(req.body.firstName, req.body.lastName, req.body.email, hash, false, function (err, user) {
            if (err) {
                return res.send({ success: false, error: err });
            }
            return res.send( { success : true, user : user})
        });
    });
}

exports.getUsers = function (req, res) {
    var users = new require('../data/models/user')();

    users.getUsers(function (err, users) {

        if (err) {
            return res.send({ error: err });
        }

        return res.send({ users : users });
    });
}

exports.getUser = function (req, res) {
    var users = new require('../data/models/user')();

    users.getUser(req.params.email, function (err, user) {

        if (err) {
            return res.send({ error: err });
        }

        return res.send({ user : user });
    });
}

exports.updateUser = function (req, res) {
    var users = new require('../data/models/user')();

    var updates = { info : { firstName : req.body.firstName, lastName : req.body.lastName }}
    users.updateUser(req.params.email, updates, function (err, user) {
        if (err) {
            return res.send({ error: err });
        }

        return res.send({ user : user });
    });
}


exports.deleteUser = function (req, res) {
    var users = new require('../data/models/user')();

    users.deleteUser(req.params.email, function (err, msg) {

        if (err) {
            return res.send({ error: err });
        }

        if(msg.deletedCount > 0) {
            return res.send({ success : true });
        }
        else {
            return res.send({ success : false });
        }
    });
}
