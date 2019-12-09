
exports.sendRecoveryEmail = function(email_to, token) {
	var nodemailer = require('nodemailer');
  
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
		user: 'mmiller3.ar@gmail.com',
		pass: "<passhere>"
	  }
	});
  
	var mailOptions = {
	  from: 'mmiller3.ar@gmail.com',
	  to: email_to,
	  subject: 'AndroidAuthentication Password Recovery',
	  html: 'Click <a href="http://ec2-18-221-31-242.us-east-2.compute.amazonaws.com:3000/changePassword.html?token=' + token + '">here</a> to recover your password.  Link will expire after 30 minutes.'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	  }); 
}
