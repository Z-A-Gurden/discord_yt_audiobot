const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const {joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioPlayer, createAudioResource} = require('@discordjs/voice')
const ytdl = require('@distube/ytdl-core');
const ytSearch = require('youtube-sr').default;
const playersModule = require('../../players');
const queuesModule = require('../../queues')

var player;
var queue;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play audio from a youtube url')
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('The URL or Query to stream the audio from')
                .setRequired(true)
        ),
	async execute(interaction){
        if(!interaction.member.voice.channel){
            await interaction.reply({content: 'User is not in a voice channel.', flags: MessageFlags.Ephemeral});
            return console.log("'play': User not in a voice channel, no connection established; reply sent.");
        }
        const channelId = interaction.member.voice.channel.id;
        const connection = getVoiceConnection(interaction.guildId) || joinVoiceChannel({
            channelId: channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });
        console.log("'play': Channel connection established or verified.");

        playersModule.addPlayer(channelId);
        player = playersModule.players.get(channelId);

        if(!connection.state.subscription){
            connection.subscribe(player);
        }

        var url = interaction.options.getString('query');
        if(!ytdl.validateURL(url)){
            const result = await ytSearch.search(url, {limit: 1});
            if(result.length === 0){
                await interaction.reply({content: 'No audio found.', flags: MessageFlags.Ephemeral});
                return console.log(`'play': No suitable video found for query: '${url}'`)
            }
            url = result[0].url;
        }
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        queuesModule.addToQueue(channelId, url);
        queue = queuesModule.queues.get(channelId);
        await interaction.reply(`Added to queue: ${title}`);
        console.log(`'play': Added URL to queue: reply sent.\nQueue contents: ${queue}`)
        
        if(player.state.status != 'playing'){
            playQueue(interaction)
        }
    }}

async function playQueue(interaction){
    // Recursive call at the end of this function will trigger this once all songs have been played
    if(queue.length == 0){
        await interaction.followUp('**No more audio to play**')
        return console.log("'play/playQueue': No more audio in queue; returned to caller and reply sent.");
    }

    const url = queue.shift();
    const stream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'});
    // Note: Maybe try testing different audio resource creation options
    const resource = createAudioResource(stream);
    player.play(resource);

    await interaction.followUp(`Playing audio: ${url}`);
    console.log("'play/playQueue': Playing audio; reply sent.");

    player.on('error', error => {
        console.log(`[ERROR] 'play/playQueue': ${error.message}`);
        interaction.followUp('**An error occured with the current audio, skipping to next.**');
        console.log("'play/playQueue': Recovering from error, moving to next queue item.");
        playQueue(interaction);
    });
    player.once(AudioPlayerStatus.Idle, () => {
        playQueue(interaction, queue);
    })
}