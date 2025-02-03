const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const Players = require('../../players');

// Clears queue based on channel id
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-queue')
		.setDescription('Clears the audio queue'),
	async execute(interaction){
		if(!interaction.member.voice.channel){
			interaction.reply({content: 'Join a channel to clear a queue', flags: MessageFlags.Ephemeral});
			return console.log("'clear': Attempted to clear queue whilst not in voice channel; reply sent");
		}
		const channelId = interaction.member.voice.channel.id;

		try{
        Players.getPlayer(channelId).clearQueue();
		} catch(error){
			await interaction.reply({content: error, flags: MessageFlags.Ephemeral})
			return console.log(`'clear': ${error}; reply sent`)
		}

        await interaction.reply('Cleared queue');
		console.log("'clear-queue': Cleared queue; reply sent")
	}
};