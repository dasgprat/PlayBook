const transport = require('./transport');

function sendVerificationRequest(toName, toAddress, verificationLink, cb) {
    let subject = 'Verify Your Account';
    let body = `
        <p>Hello ${toName}!</p>

        <p>Thank you for signing up to use the PlayBook service. Please verify your email address by clicking on the link
        below:</p>

        <a href="${verificationLink}">Verify My Account</a>

        <p>Thank you,</p>

        <p>PlayBook Support Team</p>
    `;
    transport.send(toAddress, subject, body, cb);
}

module.exports = {
    sendVerificationRequest
}
