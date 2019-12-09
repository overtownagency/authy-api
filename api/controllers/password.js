exports.change_password = function (req, res) {
    let decodedToken = req.decoded_token;
    //I believe we need to fetch user role from decoded token, this will dictate whether the user sending the request has perms to change passwords for other users

    let errors = []
    if (!req.body.email) {
        errors.push("Email is required");
    }
    if (!req.body.password) {
        errors.push("Password is required");
    }
    if (!req.body.newPassword) {
        errors.push("New password is required");
    }

    if (errors.length > 0) {
        return res.send({ success: false, formatErrors: errors });
    }

    if(req.body.password.toLowerCase() === req.body.newPassword.toLowerCase()) {
        return res.send({success: false, error: "New password cannot be the same as old password"})
    }

    if (req.body.email && decodedToken.email && req.body.email.toLowerCase() !== decodedToken.email.toLowerCase()) {
        return res.send({ success: false, error: "You do not have permission for this activity" });
    }

    const users = new require('../data/models/user')();

    users.getUser(req.body.email, function (err, user) {

        if (err) {
            return res.send({ error: err });
        }

        if (!user) {
            return res.send({ error: "Invalid email or password" });
        }
        const encrypt = require('../modules/encrypt');

        encrypt.validatePassword(req.body.password, user.password, function (success, error) {
            if (error || !success) {
                return res.send({ error: "Invalid email or password" });
            }
            else {
                //we are good to hash new password and save it
                encrypt.hashPassword(req.body.newPassword, function (hash, error) {
                    if (error) {
                        console.log(hashResult.error);
                        return res.send({ success: false, error: "Error generating password hash" });
                    }

                    //save hash in database
                    let updates = { password: hash, lastPasswordChange: new Date(), passwordExpiryDate: new Date() }
                    users.updateUser(req.body.email, updates, function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.send({ success: false, error: "Error changing password" });
                        }

                        return res.send({ success : true });
                    });
                });
            }
        });
    });
}


// exports.forgot_password = function(req, res) {
// 	var emails = require('../notifications/email');
// 	var authModel = require('../data/models/password');

// 	token = jwt.sign(req.query.email, 'SECRET_KEY_GOES_HERE');

// 	authModel.forgot_password(req.query.email, token, function(success, error) {
// 		if(error) {
//       return res.send({ success : false, error : error});
//     }

// 	  if(success) {
// 		  emails.sendRecoveryEmail(req.query.email, token);
// 			return res.send({ success : true });
// 	  }
// 	  else {
// 			return res.send({ success : false, error :  "Forgot password failed"});
// 	  }
// 	});

// }

// exports.change_password_with_token = function(req, res) {
// 	var authModel = require('../data/models/password');

// 	authModel.change_password_with_token(req.body.email, req.body.password, req.body.token, function(success, error) {
// 		if(error) {
//       return res.send({ success : false, error : error});
//     }

// 		if(success) {
// 			return res.send({ success : true });
// 	  }
// 	  else {
// 			return res.send({ success : false, error : "Password change unsuccessful"});
// 	  }
// 	});
// }

