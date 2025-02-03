const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

// Leaves the channel without clearing the queue, joining back the bot with 'join' should play last audio playing depending on if the player plays audio in the background
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Closes the bot\s connection to the voice channel, doesn\'t clear the queue'),
	async execute(interaction){
        const connection = getVoiceConnection(interaction.guild.id);
        if(!connection){
                interaction.reply({content: 'Bot is not in a voice channel', flags: MessageFlags.Ephemeral})
                return console.log("'leave': Bot is not in a channel; reply sent");
        }
        connection.destroy();
        await interaction.reply({content: 'Bot has left the channel', flags: MessageFlags.Ephemeral});
        console.log("'leave': Connection destroyed (left channel); reply sent");
        }
};