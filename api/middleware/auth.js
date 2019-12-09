
exports.authenticateRequest = function (req, res, next) {
    var tokenService = require('../modules/token');
    let token = req.headers['authorization']

    if (!token) {
        return res.status(403).send({ error: 'No token provided' });
    }

    token = token.replace("Bearer ", "");

    tokenService.validate_signature(token, function (success, decoded, error) {
        if (success) {
            req.decoded_token = decoded;
            next();
        }
        else {
            return res.status(401).send({ error });
        }
    });
}