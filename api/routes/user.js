module.exports = function(app) {
	var ctx = require('../controllers/user');
	var authenticate = require('../middleware/auth').authenticateRequest;
  
    app.route('/api/users').post(authenticate, ctx.createUser).get(authenticate, ctx.getUsers);
    app.route('/api/users/:email').get(authenticate, ctx.getUser).delete(authenticate, ctx.deleteUser).post(authenticate, ctx.updateUser);
  
	// app.route('/api/users').get(middle.validateToken, ctx.getUsers );
	// app.route('/api/users/:user_id').get(middle.validateToken, ctx.getUser );
  
  };