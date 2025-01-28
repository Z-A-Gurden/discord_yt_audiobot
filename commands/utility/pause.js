const { SlashCommandBuilder } = require('discord.js');
const { player } = require('./play');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses or resumes audio depending on current state'),
	async execute(interaction) {
        // Pauses or plays audio player depending on current state, or presents the bottom reply if the state is idle. Actions are logged to allow for debugging if needed.
        if(player.state.status == 'playing'){
            player.pause();
            interaction.reply('Audio paused.');
            return console.log("'pause': Player paused successfully; reply sent.")
        }
        if(player.state.status == 'paused'){
            player.unpause();
            interaction.reply('Audio resumed.');
            return console.log("'pause': Player resumed successfully; reply sent.")
        }
		await interaction.reply('There is no audio playing');
        console.log("'pause': Player is idle; reply sent.")

	}
};