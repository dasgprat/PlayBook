const nodemailer = require('nodemailer');
const config = require('config');
const _config = config.get('email');
const path = require('path');
const fs = require('fs');
const logger = require('winstonson')(module);
const ini = require('ini');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

let _transporter = null;
let _oauthClient = null;

function _createTransport(cb) {
    fs.readFile(path.join(process.cwd(), _config.credentials), 'utf8', async (err, text) => {
        if (err) return cb(new Error('Failed to read password secret: ' + err.message));
        let credentials = ini.parse(text);
        _oauthClient = new OAuth2(credentials.clientId, credentials.clientSecret, _config.redirectUrl);
        _oauthClient.setCredentials({
            refresh_token: credentials.refreshToken
        });
        const tokens = await _oauthClient.refreshAccessToken();
        const accessToken = tokens.credentials.access_token;
        _transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: _config.address,
                clientId: credentials.clientId,
                clientSecret: credentials.clientSecret,
                refreshToken: credentials.refreshToken,
                accessToken
            }
        });
        logger.debug('Email transport initialized');
        cb(null);
    });
}

function send(to, subject, message, cb) {
    if (_transporter === null) {
        logger.debug('Email transport has not been initialized. Initializing now...');
        _createTransport(err => {
            if (err) return cb(err);
            _send(to, subject, message, cb);
        });
    } else {
        _send(to, subject, message, cb);
    }
}

function _send(to, subject, message, cb) {
    logger.debug('Sending email to ' + to);
    let mailOptions = { to, from: _config.fromAddress, subject, html: message };
    _transporter.sendMail(mailOptions, err => {
        if (err) return cb(new Error('Failed to send email: ' + err.message));
        return cb(null);
    });
}

module.exports = {
    send
};
