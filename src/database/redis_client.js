import { createClient } from 'redis';
import { RedisUser, MarkEntry } from './database_objects.js';
import config from '../../config.json' assert { type: 'json'};

let port, host, redisClient;

if (process.env.environment === 'production') {
    port = config.database.port;
    host = config.database.host;
};

// Instantiates the Client
(async() => {
    redisClient = createClient({
        port: port ?? 6379,
        host: host ?? '127.0.0.1'
    });

    redisClient.on('error', err => console.log('Redis Client Error', err));

    await redisClient.connect();
})();

/**
 * Creates a new RedisUser in the Redis database
 * @param {DiscordJS User} user to add to the database
 */
redisClient.newUser = function(user) {
    this.json.set(user.id, '$', RedisUser(user));
};

/**
 * Add a mark to the markee's RedisUser marks
 * @param {DiscordJS User} markee The user calling the mark
 * @param {DiscordJS User} marker The user being marked
 * @param {Number} timestamp Time at which the mark command ran
 * @param {Number} expiration Time at which the mark expires
 */
redisClient.addMark = function(markee, marker, timestamp, expiration) {
    this.json.set(markee.id, `.marks.${timestamp}`, MarkEntry(markee, marker, Number(timestamp) + Number(expiration)));
};

/**
 * Update the result of a given mark
 * @param {DiscordJS User} markee The user calling the mark
 * @param {Number} timestamp Time at which the mark command ran, used as a key to find the mark in Redis
 */
redisClient.updateMark = function(markee, timestamp) {
    this.json.set(markee.id, `.marks.${timestamp}.result`, true);
};

export { redisClient };
