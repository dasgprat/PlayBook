const Playlist = require('../../model/playlist.model');
const response = require('./response');
const status = require('http-status');
const logger = require('winstonson')(module);

module.exports = {
    getPlaylist
};

async function getPlaylist(req, res) {
    try {
        logger.trace(`Retrieving playlist for ${req.params.username}`);
        let playlists = await Playlist.find({ username: req.params.username });
        return response.sendQueryResponse(res, status.OK, playlists);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'retrieve playlists');
    }
}
