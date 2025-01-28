const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { player, queue } = require('./play');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skip current audio in queue'),
	async execute(interaction){
		// If no song is next in queue then a reply will be and no action will be taken, otherwise stop current audio, therefore skipping.
        if(queue.length == 0){
			await interaction.reply({content: 'No other songs in queue to skip too.', flags: MessageFlags.Ephemeral});
            return console.log("'skip': No songs to skip too; reply sent.")
        }
		player.stop();
		await interaction.reply('Skipping current audio.');
        console.log("'skip': Skipped song; reply sent.");
	}
};