const jwt = require("jsonwebtoken"),
  {
    JWT_SECRET,
    JWT_SECRET_ADMIN
  } = require("../config/secret"),
  fa = require('../helper/language/fa.json'),
  sendResponse = require('../utils/sendResponse');

module.exports = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    const error = new Error(fa.error.invalidToken);
    error.status = 401;
    throw error;
  }
  token = token.replace("Bearer ", "");
  try {
    let decoded;
    if (req.originalUrl.split('/')[3].toLowerCase() === 'admin') {
      decoded = jwt.verify(token, JWT_SECRET_ADMIN);
    } else {
      decoded = jwt.verify(token, JWT_SECRET);
    }
    // TODO add check block or deactive from redis
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res, err.status || 401, {
      error: {
        message: err.message || fa.error.invalidToken
      }
    });
  }
};