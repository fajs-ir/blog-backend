const redis = require('redis'),
    server = require('../helper/language/server.json');


const client = redis.createClient();

client.on('error', (err) => {
    console.error(server.error.redisConnectionError);
    console.error(err);
    process.exit(1);
});

client.connect();

client.on('connect', (err, response) => {
    if (err) {
        console.error(server.error.redisConnectionError);
        console.error(err);
        process.exit(1);
    }
    console.log(server.success.redisConnected);
});

module.exports = client;