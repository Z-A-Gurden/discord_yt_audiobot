const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const playersModule = require('../../players');

// Skips currently playing audio/stops if none queued
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip current audio in queue. If no queue is present, the audio will just end instead'),
	async execute(interaction){
		if(!interaction.member.voice.channel){
			interaction.reply({content: 'You must be in a voice channel.', flags: MessageFlags.Ephemeral});
			return console.log("'skip': User attempted to skip whilst not in a voice channel; reply sent.");
		}
		channelId = interaction.member.voice.channel.id;

        const player = playersModule.players.get(channelId);
		if(typeof(player) === 'undefined'){
			await interaction.reply({content: 'No audio player exists, try playing some audio first.', flags: MessageFlags.Ephemeral});
			return console.log("'skip': Attempted skip with no player present; reply sent");
		}

		player.stop();
		await interaction.reply('Skipping current audio.');
        console.log("'skip': Skipped song; reply sent.");
	}
};