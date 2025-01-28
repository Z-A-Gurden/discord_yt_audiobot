const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const { queue } = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear-queue')
		.setDescription('Clears the audio queue'),
	async execute(interaction){
		/*  */
        queue = [];
        await interaction.reply('Cleared queue.');
		console.log("'clear-queue': Cleared queue; reply sent.")
	}
};