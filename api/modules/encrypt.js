const bcrypt = require('bcrypt');

exports.hashPassword = function (password, callback) {
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return callback(null, err)
        }
        else {
            return callback(hash);
        }
    });
}

exports.validatePassword = async function (password, hashed, callback) {
    bcrypt.compare(password, hashed, function (err, res) {
        if(err) {
            return callback(false, err);
        }

        return callback( (res) ? true : false );
    });
}