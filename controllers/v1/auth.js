const fa = require('../helper/language/fa.json'),
    sendResponse = require('../../utils/sendResponse'),
    services = require('../../services');

exports.login = async (req, res) => {
    try {
        let user = await services.v1.auth.login({...req.body, userAgent: req.headers['user-agent']});
        sendResponse(res, 200, user);
    } catch (error) {
        error = JSON.parse(error.message);
        sendResponse(res, 400, );
    }
}

exports.verify = async (req, res) => {
    try {
        let user = await services.v1.auth.verify({...req.body, userAgent: req.headers['user-agent']});
        sendResponse(res, 200, user);
    } catch (error) {
        error = JSON.parse(error.message);
        sendResponse(res, 400, );
    }
}

exports.register = async (req, res) => {
    try {
        let user = await services.v1.auth.register({...req.body});
        sendResponse(res, 200, user);
    } catch (error) {
        error = JSON.parse(error.message);
        sendResponse(res, 400, );
    }
}