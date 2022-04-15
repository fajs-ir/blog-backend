const dotenv = require('dotenv');
dotenv.config();

exports.JWT_SECRET = process.env.JWTSECRET;
exports.JWT_SECRET_ADMIN = process.env.JWTSECRETADMIN;
