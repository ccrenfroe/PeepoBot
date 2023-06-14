/**
 * Represents a User from Discord
 * @param {String} id Unique ID used by Discord to identify the user
 * @param {String} username User's name in their server
 * @returns Object representing a user in Discord
 */
function DiscordUser(id, username) {
    return {
        id,
        username
    };
};

/**
 * Represents a User in the bot database
 * @param {DiscordJS User} user Used to build the DiscordUser object
 * @returns Object representing a user in the Redis database
 */
function RedisUser(user) {
    user = DiscordUser(user.id, user.username);
    return {
        user,
        points: 0,
        marks: {}
    };
};

const LATE = false;

/**
 * Represents a mark on a user
 * @param {DiscordJS User} markee The user calling the mark
 * @param {DiscordJS User} marker The user being marked
 * @param {Number} expiration Time at which the mark expires
 * @returns Javascript Object representing a mark
 */
function MarkEntry(markee, marker, expiration) {
    markee = DiscordUser(markee.id, markee.username);
    marker = DiscordUser(marker.id, marker.username);
    return {
        expiration,
        markee,
        marker,
        result: LATE
    };
};

export { RedisUser, MarkEntry };
