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
            option.setName('time')
                .setDescription('Time in minutes to countdown from. Valid inputs - 1, 60')
                .setRequired(true)
        ),
    category: 'tracking',
    async execute(interaction) {
        await interaction.reply('still testing . . .');
    }
};
