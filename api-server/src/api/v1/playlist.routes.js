const express = require('express');
const handler = require('./playlist.handlers');
const passport = require('passport');

const playlist = express.Router();

playlist.post('/playlist/',
    passport.authenticate('jwt', { session: false }),
    handler.addPlaylist);

playlist.post('/playlist/:id',
    passport.authenticate('jwt', { session: false }),
    handler.mergePlaylist);

playlist.get('/playlist/:id/delete',
    passport.authenticate('jwt', {session: false}),
    handler.deletePlaylist);            

playlist.get('/playlist/:id',
    passport.authenticate('jwt', { session: false }),
    handler.getPlaylist);

    playlist.get('/user/:username/playlist',
    passport.authenticate('jwt', { session: false }),
    handler.getPlaylists);

module.exports = playlist;
