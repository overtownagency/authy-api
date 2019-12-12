const EventEmitter = require('events');
const emitter = new EventEmitter();

//Send email when a referral is successfully submitted
emitter.on('createUser', function () {
    // const emailer = require('../notifications/email');
    // emailer.sendRecoveryEmail('asdf','asdf');
});

emitter.on('FORGOT_PASSWORD', function (email, token) {
    const url = process.env.CHIRP_HOST + "/api/email/recovery";
    const body = { emailTo: email, token: token }

    request.post({ url: url, json: true, body: body }, function (err, res) {
        if (err) {
            console.log(err);
            return res.send({ success: false, error: "Error processing email service" });
        }
        else {
            return res.send({ success: true });
        }
    });
});

module.exports = emitter;


/*
To use, import:
const emitter = require('../events/events');

then emit event:
 emitter.emit('createUser');
*/