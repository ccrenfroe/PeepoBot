import { SlashCommandBuilder } from '@discordjs/builders';

const commandObject = {
    commandInfo: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!').toJSON(),
    meta: { category: 'utility' }
};

async function execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    console.debug(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
};

export { commandObject, execute };
