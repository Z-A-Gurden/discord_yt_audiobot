const { SlashCommandBuilder, MessageFlags, ConnectionService} = require('discord.js');
const queuesModule = require('../../queues')

// Lists the contents of queue (non-inclusive of current playing audio) in a numbered list
module.exports = {
	data: new SlashCommandBuilder()
		.setName('list-queue')
		.setDescription('List the contents of the audio queue'),
	async execute(interaction) {
        if(!interaction.member.voice.channel){
			interaction.reply({content: 'You must be in a voice channel to list the queue.', flags: MessageFlags.Ephemeral});
			return console.log("'skip': User attempted to skip whilst not in channel; reply sent.");
		}
        const channelId = interaction.member.voice.channel.id;

        const queue = queuesModule.queues.get(channelId);
        // Note: Checks if undefined first, because if it is the other way round it complains about length being undefined; evaluation in this if is L -> R
        if(typeof(queue) === 'undefined' || queue.length == 0){
            await interaction.reply({content: 'No audio queued.', flags: MessageFlags.Ephemeral});
            return console.log("'list-queue': No songs in queue; reply sent.");
        }

        await interaction.reply({content: 'Listing queue contents: ', flags: MessageFlags.Ephemeral});
        console.log(queue);
        count = 1;
        for(const item of queue){
            await interaction.followUp({content: `${count}. ${item}`, flags: MessageFlags.Ephemeral});
            count += 1;
        }
        console.log("'list-queue': Listed items in queue.");
	}
};