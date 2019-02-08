const Playlist = require('../../model/playlist.model');
const Category = require('../../model/category.model');
const response = require('./response');
const status = require('http-status');
const logger = require('winstonson')(module);

module.exports = {
    addPlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylist
};

async function addPlaylist(req, res) {
    try {
        if(!req.body.name || !req.body.description || !req.body.author){
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing name or description or author');
        }
        logger.trace(JSON.stringify(req.body));
        let playlist = new Playlist.Playlist(req.body);
        playlist.categories = await Promise.all(req.body.categories.map(async category => {
            let cat = await Category.merge(category);
            console.log(cat);
            return cat;
        }));
        logger.trace('category', JSON.stringify(req.body));
        playlist = await Playlist.merge(playlist);
        return response.sendActionResponse(res, status.CREATED, 'Successfully added new playlist', playlist);
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
