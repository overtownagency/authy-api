var db = require('../postgres');

exports.authenticate = function(email, password, callback) {
	var query = { text : "select public.authenticate_user($1, $2)", values : [email, password] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			return callback(rows[0].authenticate_user);
		}
	});
}

exports.update_token = function(user_id, token, signature, callback) {
	var query = { text : "select public.update_token($1, $2, $3)", values : [user_id, token, signature] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			return callback(rows[0].update_token);
		}
	});
}

exports.get_signature = function(token, callback) {
	var query = { text : "select signature from public.tokens where auth_token = $1", values : [token] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(!rows)
			return callback(false, "Invalid token");

		if(rows.rowCount == 0) {
			return callback(false, "Invalid token");
		}
		else {
			return callback(rows[0].signature);
		}
	});
}