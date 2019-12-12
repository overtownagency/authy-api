const secret_key = "LJSDSDOISDOFIJOWEOIFSDOMWOEISDLFKSDJFLSDJKFWEOIJSDF";

exports.create_signature = function (userId, email) {
    let payload = { userId: userId, email: email }
    var signature = jwt.sign(payload, secret_key, { expiresIn: 3600 });
    return signature;
}

exports.validate_signature = function (signature, callback) {
    jwt.verify(signature, secret_key, function (err, decoded) {
        if (err) {
            return callback(false, null, "Invalid or expired token");
        }
        else {
            // decrypted_token = jwt.decode(signature, secret_key);
            return callback(true, decoded);
        }
    });
}
exports.decode_signature = function (signature, callback) {
    jwt.verify(signature, secret_key, function (err, decoded) {
        if (err) {
            return callback(null, "Invalid or expired token");
        }
        else {
            return callback(decoded);
        }
    });
}

exports.createTemporaryToken = function () {
    const uuidv4 = require('uuid/v4');
    return uuidv4();
}