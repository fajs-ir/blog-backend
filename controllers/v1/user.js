const User = require("../../models/User"),
    _ = require("lodash"),
    en = require('../helper/language/en.json'),
    userService = require('../../services/user'),
    preferencesService = require('../services/preferences'),
    sendResponse = require('../../utils/sendResponse'),
    sendFile = require('../utils/sendFile');

// update user detail by userId and user logged in
exports.update = async (req, res) => {
    try {
        const data = await userService.update({
            userId: req.user._id,
            body: req.body
        });
        return sendResponse(res, 200, data);
    } catch (err) {
        return sendResponse(res, err.status || 400, {
            error: {
                message: err.message || en.enterDataCorrectly
            }
        });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        const data = await userService.updateAvatar({
            userId: req.user._id,
            body: req.body
        });
        return sendResponse(res, 200, data);
    } catch (err) {
        return sendResponse(res, err.status || 400, {
            error: {
                message: err.message || en.enterDataCorrectly
            }
        });
    }
};

// delete avatar
exports.deleteAvatar = async (req, res) => {
    try {
        const data = await userService.deleteAvatar({
            userId: req.user._id
        });
        return sendResponse(res, 200, data);
    } catch (err) {
        return sendResponse(res, err.status || 400, {
            error: {
                message: err.message || en.enterDataCorrectly
            }
        });
    }
};

// get user detial
exports.getUserDetail = async (req, res) => {
    try {
        const data = await userService.me({
            userId: req.user._id
        });
        return sendResponse(res, 200, data);
    } catch (err) {
        return sendResponse(res, err.status || 400, {
            error: {
                message: err.message || en.enterDataCorrectly
            }
        });
    }
};

// user deactive
exports.userDeactive = async (req, res) => {
    try {
        const data = await userService.deactive({
            userId: req.user._id
        });
        return sendResponse(res, 200, data);
    } catch (err) {
        return sendResponse(res, err.status || 400, {
            error: {
                message: err.message || en.enterDataCorrectly
            }
        });
    }
};