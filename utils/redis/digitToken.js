const redisClient = require('../../config/redis'),
    {
        digitExpireAfter
    } = require("../../config/config"),
    randomDigits = require("../randomDigits");

const add = async (email) => {
    const code = await randomDigits(6);
    redisClient.set(`token-${email}`, code, 'EX', digitExpireAfter);
    return code;
}

const check = async (email, code) => {
    const redisCode = await redisClient.get(`token-${email}`);
    if (redisCode && redisCode === code) {
        redisClient.del(`token-${email}`);
        return true;
    }
    return false;
}

module.exports = {
    add,
    check,
}