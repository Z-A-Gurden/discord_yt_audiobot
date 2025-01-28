const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const { queue } = require('./play');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop audio'),
	async execute(interaction){
		connection = getVoiceConnection(interaction.guild.id);
		queue.length = 0;
        connection.destroy();
		await interaction.reply('Cleared queue and stopped player.');
		console.log("'stop': Cleared queue and destroyed connection to channel; reply sent.");
	}
};