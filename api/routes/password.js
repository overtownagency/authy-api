module.exports = function(app) {
	var ctx = require('../controllers/password');
    var authenticate = require('../middleware/auth').authenticateRequest;

	app.route('/api/password/change').post(authenticate, ctx.change_password);
	app.route('/api/password/recovery').post(ctx.forgot_password);
	//.post(ctx.change_password_with_token);
  };