const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const Players = require('../../players');

// Stops the player, clearing queue in the process, leaves channel
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop audio, clear queue, and exit channel'),
	async execute(interaction){
		if(!interaction.member.voice.channel){
			interaction.reply({content: 'You must be in a voice channel.', flags: MessageFlags.Ephemeral});
			return console.log("'stop': User attempted to stop player whilst not in a voice channel; reply sent.");
		}
		const channelId = interaction.member.voice.channel.id;
		
		const player = Players.getPlayer(channelId).stop();

		connection = getVoiceConnection(interaction.guild.id);
		if(typeof(connection) === 'undefined'){
			await interaction.reply('Bot is not in a channel.');
			return console.log("'stop': Bot not in channel; reply sent.");
		}

		connection.destroy();
		await interaction.reply('Cleared queue and stopped player.');
		console.log("'stop': Cleared queue and destroyed connection to channel if it exists; reply sent.");
	}
};