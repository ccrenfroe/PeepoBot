import { SlashCommandBuilder } from '@discordjs/builders';
import { redisClient } from '../../database/redis_client.js';

// TODO: Allow entry of a date; allow entry of string with hours minutes seconds; allow entry of numbers

const commandObject = {
    commandInfo: new SlashCommandBuilder()
        .setName('mark')
        .setDescription('Mark a user to track')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Target to mark')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('hours')
                .setDescription('Time in hours to countdown from. Valid inputs - 0 to 24')
                .setMinValue(0).setMaxValue(24))
        .addIntegerOption(option =>
            option.setName('minutes')
                .setDescription('Time in minutes to countdown from. Valid inputs - 0 to 60')
                .setMinValue(0).setMaxValue(60))
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('Time in seconds to countdown from. Valid inputs - 0 to 60')
                .setMinValue(0).setMaxValue(60)).toJSON(),
    meta: { category: 'tracking' }
};

async function execute(interaction) {
    console.debug(interaction);
    console.debug(interaction.options.getUser('target'));

    const timestamp = Date.now();
    const markee = interaction.options.getUser('target');
    const marker = interaction.user;

    const time = ['hours', 'minutes', 'seconds'];
    for (let i = 0; i < time.length; i++) {
        time[i] = interaction.options.getInteger(time[i]);
    }
    const milliseconds = timeConvertToMs(...time);
    if (milliseconds === 0) { return await interaction.reply({ content: 'A time must be given!', ephemeral: true }); }
    await interaction.reply(`Marking ${markee}!`);

    const exists = await redisClient.json.get(markee.id);
    if (exists === null) {
        await redisClient.newUser(markee);
    }
    await redisClient.addMark(markee, marker, timestamp, milliseconds);

    setTimeout(markTarget, milliseconds, markee, timestamp);
};

async function markTarget(markee, timestamp) {
    await redisClient.updateMark(markee, timestamp);
    console.info(`mark ${timestamp} for ${markee.username} fired`);
};

function timeConvertToMs(hours, minutes, seconds) {
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
};

export { commandObject, execute };
