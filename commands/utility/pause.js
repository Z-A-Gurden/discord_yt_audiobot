const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const playersModule = require('../../players');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses or resumes audio depending on current state'),
	async execute(interaction) {
        channelId = interaction.member.voice.channel.id;
        // Note: Add check for if a suitable player does not exist.
        const player = playersModule.players.get(channelId);
        // Below check made for when a user tries to pause/resume a player which hasn't actually been created yet, i.e. calling it before playing audio.
        if(typeof(player) === 'undefined'){
            await interaction.reply({content: 'Cannot pause a non existent player, try playing some audio first.', flags: MessageFlags.Ephemeral});
            return console.log("'pause': Attempted to pause non existent player; reply sent.");
        }
        // Pauses or plays audio player depending on current state, or presents the bottom reply if the state is idle. Actions are logged to allow for debugging if needed.
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