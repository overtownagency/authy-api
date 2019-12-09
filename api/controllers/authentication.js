jwt = require('jsonwebtoken');

exports.auth_token = function (req, res) {
    var tokenService = require('../modules/token');
    var token = req.headers['authorization'].replace("Bearer ", "");

    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }

    tokenService.validate_signature(token, function (success, decoded, error) {
        if (success) {
            return res.send({ success : success, decoded : decoded });
        }
        else {
            return res.status(401).send({ error });
        }
    });
};

exports.auth_user = function (req, res) {
    const encrypt = require("../modules/encrypt");
    const users = new require('../data/models/user')();
    const tokenService = require('../modules/token');

    users.getUser(req.body.email, function (err, user) {

        if (err) {
            return res.send({ error: err });
        }

        if (!user) {
            return res.send({ error: "Invalid email or password" });
        }

        encrypt.validatePassword(req.body.password, user.password, function (success, error) {
            if (error || !success) {
                return res.send({ error: "Invalid email or password" });
            }
            else {
                let signature = tokenService.create_signature(user.id, user.email);
                return res.send({ token: signature });
            }
        });
    });
};
