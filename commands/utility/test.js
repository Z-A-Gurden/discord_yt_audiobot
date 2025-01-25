const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('a command for testing'),
	async execute(interaction) {
		await interaction.reply('Test successful');
	},
};
