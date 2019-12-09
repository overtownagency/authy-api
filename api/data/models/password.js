var db = require('../postgres');

exports.change_password = function(email, password, callback) {
	var query = { text : "select public.change_password($1, $2)", values : [email, password] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			return callback(rows[0].change_password);
		}
	});
}

exports.change_password_with_token = function(email, password, token, callback) {
	var query = { text : "select public.change_password_with_token($1, $2, $3)", values : [email, password, token] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			if(!rows[0].change_password_with_token)
				return callback(rows[0].change_password_with_token, "Token is expired");
			else
				return callback(rows[0].change_password_with_token)
		}
	});
}

exports.forgot_password = function(email, token, callback) {
	var query = { text : "select public.forgot_password($1, $2)", values : [email, token] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			return callback(rows[0].forgot_password);
		}
	});
}

exports.validate_password_token = function(email, token, callback) {
	var query = { text : "select public.validate_forgot_token($1, $2)", values : [email, token] };

	db.getResult(query, function(error, rows){
		if(error) {
			return callback(false, error);
		}

		if(rows.rowCount == 0) {
			return callback(false, error);
		}
		else {
			return callback(rows[0].validate_forgot_token);
		}
	});
}