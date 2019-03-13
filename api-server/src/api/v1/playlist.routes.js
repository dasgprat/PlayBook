const express = require('express');
const handler = require('./playlist.handlers');
const { authorize } = require('../../util/security');

const playlist = express.Router();

playlist.post('/playlists/', authorize, handler.addPlaylist);

playlist.delete('/playlists/:id', authorize, handler.deletePlaylist);

playlist.get('/playlists/:id', authorize, handler.getPlaylist);

playlist.get('/playlists', authorize, handler.getPlaylists);

playlist.post('/playlists/:id/subscribers', authorize, handler.subscribeToPlaylist);

playlist.delete('/playlists/:pid/subscribers/:sid', authorize, handler.unsubscribeFromPlaylist);

module.exports = playlist;
