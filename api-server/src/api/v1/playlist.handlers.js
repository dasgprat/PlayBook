const Playlist = require('../../model/playlist.model');
const Category = require('../../model/category.model');
const response = require('./response');
const User = require('../../model/user.model');
const status = require('http-status');
const logger = require('winstonson')(module);
const url = require('url');

module.exports = {
    addPlaylist,
    deletePlaylist,
    getPlaylists,
    getPlaylist,
    subscribeToPlaylist
};

async function addPlaylist(req, res) {
    try {
        if (!req.body.name || !req.body.description || !req.body.author) {
            return response.sendErrorResponse(res, status.BAD_REQUEST, 'Missing name or description or author');
        }
        let playlist = new Playlist.Playlist(req.body);
        let categories = await Promise.all(
            req.body.categories.map(async category => {
                return await Category.merge(category);
            })
        );
        playlist.categories = categories.map(category => {
            return category.id;
        });
        playlist = await Playlist.merge(playlist);
        return response.sendActionResponse(res, status.CREATED, 'Successfully added new playlist', playlist);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'add new playlist');
    }
}

async function getPlaylists(req, res) {
    try {
        const url_parts = url.parse(req.url, true);
        logger.trace(`Retrieving playlist for ${JSON.stringify(url_parts.query)}`);
        const user = await User.find({ username: req.user.sub });
        let playlists = await Playlist.find(url_parts.query, user.id);
        if (url_parts.query.subscribedBy) {
            playlists = playlists.map(p => p.id);
        }
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
        let tmp = await Playlist.deletePlaylistUser({ id: req.params.id });
        return response.sendQueryResponse(res, status.OK, tmp);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'delete playlist');
    }
}

async function subscribeToPlaylist(req, res) {
    try {
        // Get the playlist
        let pl = await Playlist.findById({ id: req.params.id });
        if (!pl) return response.sendErrorResponse(res, status.NOT_FOUND, 'Failed to find playlist');

        // Make sure the subscriber's id is valid
        let subId = req.body.subscriberId;
        if (!subId) return response.sendErrorResponse(res, status.BAD_REQUEST, "Must provide subscriber's id");
        let user = await User.find({ id: subId });
        if (!user) return response.sendErrorResponse(res, status.NOT_FOUND, 'Failed to find subscriber');

        // Add the subscriber if they aren't already there
        if (pl.subscribedBy.indexOf(user.id) < 0) pl.subscribedBy.push(user.id);

        // Save the changes
        await Playlist.merge(pl);

        // Get all of the playlists that the user has subscribed to
        let playlists = await Playlist.findSubscribedPlaylistsForUser(user.id);

        playlists = playlists.map(p => p.id);

        response.sendActionResponse(res, status.OK, 'Successfully subscribed to playlist', playlists);
    } catch (err) {
        logger.error(err);
        return response.sendErrorResponse(res, err, 'subscribe to playlist');
    }
}
