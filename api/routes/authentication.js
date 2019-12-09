module.exports = function(app) {
	var ctx = require('../controllers/authentication');
  
	app.route('/api/auth').post(ctx.auth_user);
	app.route('/api/auth/validate').post(ctx.auth_token);
  };