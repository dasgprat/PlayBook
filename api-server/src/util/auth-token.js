const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('config');
const path = require('path');
const { PlaybookError, ErrorCodes } = require('./error');
const { Strategy } = require('passport-jwt');

let _config = config.get('security');
let _key = path.join(process.cwd(), _config.jwt.secretKey);
let _secret = null;
let _issuer = _config.jwt.issuer;
let _audience = _config.jwt.audience;

function _retrieveSecret(cb) {
    fs.readFile(_key, 'utf8', (err, secret) => {
        if (err) return cb(new PlaybookError(ErrorCodes.F_FILE_FAILURE, 'Failed to read secret: ' + err.message));
        _secret = secret;
        cb();
    });
}

function createPassportStrategy(cb) {
    if (!_secret) {
        _retrieveSecret(err => {
            if (err) return cb(err);
            let strategy = _generateStrategy(_audience);
            return cb(null, strategy);
        });
    } else {
        let strategy = _generateStrategy(_audience);
        return cb(null, strategy);
    }
}

function _generateStrategy(audience) {
    return new Strategy(
        {
            jwtFromRequest: function(req) {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies.auth;
                }
                return token;
            },
            issuer: _issuer,
            audience,
            secretOrKey: _secret
        },
        (payload, done) => {
            // Will appear on 'req' as 'user'
            done(null, payload);
        }
    );
}

function generate(subject) {
    let payload = {
        iss: _issuer,
        sub: subject,
        aud: audience || [],
        exp: Math.floor(Date.now() / 1000) + 60 * 60
    };
    return new Promise((resolve, reject) => {
        if (!_secret) {
            _retrieveSecret((err) => {
                if (err) return reject(err);
                jwt.sign(payload, _secret, (err, token) => {
                    if (err) return reject(err);
                    return resolve(token);
                });
            });
        } else {
            jwt.sign(payload, _secret, (err, token) => {
                if (err) return reject(err);
                return resolve(token);
            });
        }
    });
}

function verify(token, subject, audience) {
    return new Promise((resolve, reject) => {
        fs.readFile(_key, 'utf8', (err, secret) => {
            if (err)
                return reject(new PlaybookError(ErrorCodes.F_FILE_FAILURE, `Failed to read secret: ${err.message}`));
            let options = { subject, audience, issuer: _issuer };
            jwt.verify(token, secret, options, (err, decoded) => {
                if (err)
                    return reject(
                        new PlaybookError(ErrorCodes.A_AUTH_TOKEN_FAILURE, `Failed to validate token: ${err.message}`)
                    );
                return resolve(decoded);
            });
        });
    });
}

module.exports = {
    generate,
    verify,
    createPassportStrategy
};
