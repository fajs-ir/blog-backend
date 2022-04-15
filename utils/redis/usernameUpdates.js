const redisClient = require('../../config/redis'),
    {
        usernameUpdateLimit
    } = require('../../config/config');

const canUpdate = async (userId) => {
    let updates = await redisClient.get(`username-updates-${userId}`);
    if (!updates) {
        updates = 0;
    }
    updates += 1;
    await redisClient.set(`username-updates-${userId}`, updates);
    return Number(updates) <= usernameUpdateLimit;
};

const updateCount = async (userId) => {
    let updates = await redisClient.get(`username-updates-${userId}`);
    if (!updates) {
        updates = 0;
    }
    return Number(updates);
};


module.exports = {
    canUpdate,
    updateCount
}