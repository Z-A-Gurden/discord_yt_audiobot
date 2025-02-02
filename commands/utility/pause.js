const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const playersModule = require('../../players');

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

        const player = playersModule.players.get(channelId);
        if(typeof(player) === 'undefined'){
            await interaction.reply({content: 'Cannot pause a non existent player, try playing some audio first.', flags: MessageFlags.Ephemeral});
            return console.log("'pause': Attempted to pause non existent player; reply sent.");
        }

        if(player.state.status == 'playing'){
            player.pause();
            await interaction.reply('Audio paused.');
            return console.log("'pause': Player paused successfully; reply sent.")
        }

        if(player.state.status == 'paused'){
            player.unpause();
            await interaction.reply('Audio resumed.');
            return console.log("'pause': Player resumed successfully; reply sent.")
        }
		await interaction.reply('There is no audio playing');
        console.log("'pause': Player is idle; reply sent.")

	}
};