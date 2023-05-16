const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply({ content: 'Pong!', fetchReply: true })
            .then((message) => console.log(`Reply sent with content ${message.content}`))
            .catch(console.error);
    }
};
