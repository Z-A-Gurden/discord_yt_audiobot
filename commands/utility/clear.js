const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const queuesModule = require('../../queues')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-queue')
		.setDescription('Clears the audio queue'),
	async execute(interaction){
		const channelId = interaction.member.voice.channel.id;
		if(typeof(channelId) === 'undefined'){
			await interaction.reply({content: 'Join a channel to clear a queue.', flags: MessageFlags.Ephemeral});
			return console.log("'clear': Attempted to clear queue whilst not in voice channel.")
		}
        queuesModule.queues.set(channelId, []);
        await interaction.reply('Cleared queue.');
		console.log("'clear-queue': Cleared queue; reply sent.")
	}
};