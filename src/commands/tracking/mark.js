const { SlashCommandBuilder } = require('@discordjs/builders');

// TODO: Allow entry of a date; allow entry of string with hours minutes seconds; allow entry of numbers

module.exports = {
    data: new SlashCommandBuilder()
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
                .setMinValue(0).setMaxValue(60)),
    category: 'tracking',
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const time = ['hours', 'minutes', 'seconds'];
        for (let i = 0; i < time.length; i++) {
            time[i] = interaction.options.getInteger(time[i]);
        }
        const milliseconds = timeConvertToMs(...time);
        if (milliseconds === 0) { return await interaction.reply({ content: 'A time must be given!', ephemeral: true }); }
        await interaction.reply(`Marking ${target}!`);
        setTimeout(markTarget, milliseconds, 'target');
    }
};

async function markTarget(target) {
    console.info(`mark for ${target} fired`);
}

function timeConvertToMs(hours, minutes, seconds) {
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
}
