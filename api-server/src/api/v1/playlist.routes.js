const express = require('express');
const handler = require('./playlist.handlers');
const passport = require('passport');

const playlist = express.Router();

playlist.get('/user/:username/playlist', passport.authenticate('jwt', { session: false }), handler.getPlaylist);

module.exports = playlist;
