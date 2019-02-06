const Playlist = require('../../model/playlist.model');
const response = require('./response');
const status = require('http-status');
const logger = require('winstonson')(module);

module.exports = {
    addPlaylist,
    deletePlaylist,
    mergePlaylist,
    getPlaylists,
    getPlaylist
};

async function addPlaylist(req, res) {
    try {
        if(!req.body.name || !req.body.description || !req.body.author){
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing name or description or author');
        }
        logger.trace(JSON.stringify(req.body));
        let playlist = await Playlist.merge(new Playlist.Playlist(req.body));
        return response.sendActionResponse(res, status.CREATED, 'Successfully added new playlist', playlist);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'add new playlist');
    }
}


async function mergePlaylist(req, res) {
    try {
        if(!req.body.name || !req.body.description || !req.body.author){
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing name or description or author');
        }
        logger.trace(JSON.stringify(req.body));
        let playlist = await Playlist.merge(new Playlist.Playlist(req.body));
        return response.sendActionResponse(res, status.CREATED, 'Successfully edited new playlist', playlist);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'add new playlist');
    }
}

async function getPlaylists(req, res) {
    try {
        logger.trace(`Retrieving playlist for ${req.params.username}`);
        let playlists = await Playlist.find({ author: req.params.username });
        return response.sendQueryResponse(res, status.OK, playlists);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'retrieve playlists');
    }
}

async function getPlaylist(req, res) {
    try {
        logger.trace(`Retrieving playlist for ${req.params.id}`);        
        let playlist = await Playlist.findById({ id: req.params.id });
        return response.sendQueryResponse(res, status.OK, playlist);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'retrieve playlist');
    }
}

async function deletePlaylist(req, res) {
    try {
        let tmp = await Playlist.deletePlaylistUser({id: req.params.id});
        return response.sendQueryResponse(res, status.OK,tmp);
    } catch (err) {           
        logger.error(err);
        return response.sendErrorResponse(res, err, 'delete playlist');
    }
}
