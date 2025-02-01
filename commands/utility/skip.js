const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const playersModule = require('../../players');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip current audio in queue. If no queue is present, the audio will just end instead'),
	async execute(interaction){
		channelId = interaction.member.voice.channel.id;
        // Note: Add check for if a suitable player does not exist.
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