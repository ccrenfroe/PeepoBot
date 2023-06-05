import { Events } from 'discord.js';

const eventInfo = {
    name: Events.ClientReady,
    once: true
};

function execute(client) { console.info(`Ready! Logged in as ${client.user.tag}`); };

export { eventInfo, execute };
