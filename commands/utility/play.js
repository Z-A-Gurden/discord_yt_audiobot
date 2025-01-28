const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const {joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioPlayer, createAudioResource} = require('@discordjs/voice')
const ytdl = require('@distube/ytdl-core');

const player = createAudioPlayer();

const queue = [];

module.exports = {
    player,
    queue,
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from a youtube url')
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('The URL to stream the audio from')
                .setRequired(true)
        ),
	async execute(interaction){
        if(!interaction.member.voice.channel){
            await interaction.reply({content: 'User is not in a voice channel.', flags: MessageFlags.Ephemeral});
            return console.log("'play': User not in a voice channel, no connection established; reply sent.");
        }
        // This works without check to see if in channel, but maybe add one just to avoid possibly making a new connection/failing to make one even if it works
        const connection = getVoiceConnection(interaction.guildId) || joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });
        console.log("'play': Channel connection established or verified.");

        if(!connection.state.subscription){
            connection.subscribe(player);
            console.log("'play': Subscribed to audio player.");
        }

        const url = interaction.options.getString('url');
        if(!ytdl.validateURL(url)){
            await interaction.reply({content: 'Invalid URL', flags: MessageFlags.Ephemeral});
            return console.log(`'play': Invalid URL: (${url}) passed; reply sent.`);
        }
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        queue.push(url);
        await interaction.reply(`Added to queue: ${title}`);
        console.log("'play': Added URL to queue: reply sent.")
        console.log(`Queue contents: ${queue}`);
        
        if(player.state.status != 'playing'){
            playQueue(interaction)
        }
        }
	}

async function playQueue(interaction){
    // Recursive call at the end of this function will trigger this once all songs have been played
    if(queue.length == 0){
        await interaction.followUp('**No more audio to play**')
        return console.log("'play/playQueue': No more audio in queue; returned to caller and reply sent.");
    }
    const url = queue.shift();
    const stream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'});
    const resource = createAudioResource(stream);
    player.play(resource);

    await interaction.followUp(`Playing audio: ${url}`);
    console.log("'play/playQueue': Removed and assigned url from queue; created audio resource; playing audio, and reply sent.");

    player.on('error', error => {
        console.log(`[ERROR] 'play/playQueue': ${error.message}`);
        interaction.followUp('**An error occured with the current audio, skipping to next.**');
        console.log("'play/playQueue': Recovering from error, moving to next queue item.");
        playQueue(interaction);
    });
    player.once(AudioPlayerStatus.Idle, () => {
        playQueue(interaction);
    })
}