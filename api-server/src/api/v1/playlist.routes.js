const express = require('express');
const handler = require('./playlist.handlers');
const passport = require('passport');

const playlist = express.Router();

playlist.post('/playlists/',
    passport.authenticate('jwt', { session: false }),
    handler.addPlaylist);

playlist.delete('/playlists/:id',
    passport.authenticate('jwt', {session: false}),
    handler.deletePlaylist);            

playlist.get('/playlists/:id',
    passport.authenticate('jwt', { session: false }),
    handler.getPlaylist);

playlist.get('/playlists',
    passport.authenticate('jwt', { session: false }),
    handler.getPlaylists);

module.exports = playlist;
