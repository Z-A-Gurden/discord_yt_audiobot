const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const { queue } = require('./play')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-queue')
		.setDescription('List the contents of the audio queue'),
	async execute(interaction) {
        if(queue.length == 0){
            await interaction.reply('No audio queued.')
            return console.log("'list-queue': No songs in queue; reply sent.")
        }
        await interaction.reply('Listing queue contents: ');
        console.log(queue);
        count = 1;
        for(const item of queue){
            await interaction.followUp(`${count}. ${item}`);
            count += 1;
        }
        console.log("'list-queue': Listed items in queue.");
	}
};