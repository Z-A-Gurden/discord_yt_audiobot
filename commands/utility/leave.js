const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Closes the bot\s connection to the voice channel'),
	async execute(interaction){
        /* if(!getVoiceConnection(interaction.guild.id)){
                interaction.reply({content: 'Bot is not in a voice channel.', flags: MessageFlags.Ephemeral})
                return console.log('\'leave\': Bot is not in a channel; reply sent.');
        } */
        const connection = getVoiceConnection(interaction.guild.id);
        if(!connection){
                interaction.reply({content: 'Bot is not in a voice channel.', flags: MessageFlags.Ephemeral})
                return console.log("'leave': Bot is not in a channel; reply sent.");
        }
        connection.destroy();
        await interaction.reply({content: 'Bot has left the channel', flags: MessageFlags.Ephemeral});
        console.log("'leave': Connection destroyed (left channel); reply sent.");
        }
};