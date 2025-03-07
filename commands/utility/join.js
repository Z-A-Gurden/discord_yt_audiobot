const { SlashCommandBuilder, MessageFlags} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')

// Standalone command to join channel.
// Main purpose is in combination with 'leave', so that you can get the bot to join and play current audio without providing more audio for it to play
module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the user\'s voice channel'),
    async execute(interaction){
        if (!interaction.member.voice.channel){
            await interaction.reply({content: 'User is not in a voice channel', flags: MessageFlags.Ephemeral})
            return console.log("'join': User not in channel; reply sent");
        }
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });
        await interaction.reply({content: 'Joined voice channel', flags: MessageFlags.Ephemeral})
        console.log("'join': Connection to channel established; reply sent")
    }
}