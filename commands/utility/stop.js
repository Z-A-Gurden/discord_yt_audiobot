const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const playersModule = require('../../players');
const queuesModule = require('../../queues');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop audio'),
	async execute(interaction){
		const channelId = interaction.member.voice.channel.id;
		queuesModule.queues.delete(channelId);
		playersModule.players.delete(channelId);
		connection = getVoiceConnection(interaction.guild.id);
		if(typeof(connection) !== 'undefined'){
        connection.destroy();
		}
		await interaction.reply('Cleared queue and stopped player.');
		console.log("'stop': Cleared queue and destroyed connection to channel if it exists; reply sent.");
	}
};