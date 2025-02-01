const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const queuesModule = require('../../queues')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-queue')
		.setDescription('List the contents of the audio queue'),
	async execute(interaction) {
        const channelId = interaction.member.voice.channel.id;
        const queue = queuesModule.queues.get(channelId);
        // checks if undefined first, because if it is the other way round it complains about length being undefined
        if(typeof(queue) === 'undefined' || queue.length == 0){
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