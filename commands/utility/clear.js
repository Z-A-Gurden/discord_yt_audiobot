const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const queuesModule = require('../../queues')

// Clears queue based on channel id (technically sets queue if no suitable queue is already set)
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-queue')
		.setDescription('Clears the audio queue'),
	async execute(interaction){
		if(!interaction.member.voice.channel){
			interaction.reply({content: 'Join a channel to clear a queue.', flags: MessageFlags.Ephemeral});
			return console.log("'clear': Attempted to clear queue whilst not in voice channel; reply sent.");
		}
		const channelId = interaction.member.voice.channel.id;

        queuesModule.queues.set(channelId, []);
        await interaction.reply('Cleared queue.');
		console.log("'clear-queue': Cleared queue; reply sent.")
	}
};