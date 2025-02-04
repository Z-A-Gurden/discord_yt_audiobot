const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const Players = require('../../players');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses or resumes audio depending on current state'),
	async execute(interaction) {
        // Pauses or plays player based on current state
        if(!interaction.member.voice.channel){
			interaction.reply({content: 'You must be in a voice channel.', flags: MessageFlags.Ephemeral});
			return console.log("'pause': User attempted to pause whilst not in a voice channel; reply sent.");
		}
        channelId = interaction.member.voice.channel.id;

        try{
            await interaction.reply(Players.getPlayer(channelId).pause());
            return console.log("'pause': Pause command successful; reply sent")
        } catch(error){
            await interaction.reply({content: error, flags: MessageFlags.Ephemeral});
            return console.log(`'pause: ${error}`);
        }
	}
};