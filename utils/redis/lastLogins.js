const redisClient = require('../../config/redis');

const add = async (userId, data) => {
    let last = await redisClient.get(`last-logins-${userId}`);
    if (!last) {
        last = '[]';
    }
    last = JSON.parse(last);
    
    // add to start of array
    last.unshift({
        ip: data.ip,
        browser: {
            name: data.browser.name,
            version: data.browser.version
        },
        os: {
            name: data.os.name,
            version: data.os.version
        },
        date: Date.now()
    });
    // just keep last 10
    last = last.slice(0, 10);
    redisClient.set(`last-logins-${userId}`, JSON.stringify(last));
}

const list = async (userId) => {
    let last = await redisClient.get(`last-logins-${userId}`);
    if (!last) {
        return [];
    }
    last = JSON.parse(last);
    return last;
}

module.exports = {
    add,
    list,
}