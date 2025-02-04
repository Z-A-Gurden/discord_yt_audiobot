const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const {joinVoiceChannel, getVoiceConnection, AudioPlayerStatus, createAudioPlayer, createAudioResource} = require('@discordjs/voice')
const ytdl = require('@distube/ytdl-core');
const ytSearch = require('youtube-sr').default;
const Players = require('../../players');

var player;

// Establish or verify connection to channel, creates the player and stores in ../../players, adds url to queue and calls playQueue - defined below - to play audio
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
            await interaction.reply({content: 'User is not in a voice channel', flags: MessageFlags.Ephemeral});
            return console.log("'play': User not in a voice channel, no connection established; reply sent");
        }

        const channelId = interaction.member.voice.channel.id;
        const connection = getVoiceConnection(interaction.guildId) || joinVoiceChannel({
            channelId: channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
            selfDeaf: true
        });
        console.log("'play': Channel connection established or verified");

        Players.addPlayer(channelId);
        player = Players.getPlayer(channelId);

        try{
            player.subscribe(connection);
        } catch(error){
            await interaction.reply({content: error, flags: MessageFlags.Ephemeral});
            return console.log(`'play': ${error}; reply sent`);
        }

        // If input is a url, no reassignment of input url is done; if input is not a url, a ytSearch is done to get a valid url from words,
        // e.g, https://www.youtube.com/watch?v=dQw4w9WgXcQ remains unchanged when processed, but 'rick roll' is changed to the afformentioned url
        var url = interaction.options.getString('query');
        console.log(`'play': Original query: "${url}"`);
        if(!ytdl.validateURL(url)){
            const result = await ytSearch.search(url, {limit: 1});
            if(result.length === 0){
                await interaction.reply({content: 'No audio found.', flags: MessageFlags.Ephemeral});
                return console.log(`'play': No suitable video found for query: '${url}'`)
            }
            url = result[0].url;
        }

        // Extracts title, adds to queue and replys to state what audio is playing with its title
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;

        player.addToQueue(url);

        await interaction.reply(`Added to queue: ${title}`);
        console.log(`'play': Added URL to queue: reply sent.\nQueue contents: ${player.getQueue()}`)
        
        // If the player is playing, a user calling the play command won't cause the current audio to stop playing to make way for the next
        // Queued tracks are played next/handled in playQueue
        if(player.getState() !== 'playing'){
            playQueue(interaction)
        }
    }}

// Takes url from queue to create resource for player, and then plays that resource
async function playQueue(interaction){
    // Check if queue is empty, prevents more recursive calls for no reason
    if(player.getQueue().length === 0){
        await interaction.channel.send('**No more audio to play**')
        return console.log("'play/playQueue': No more audio in queue; returned to caller and reply sent.");
    }

    // Create an audio resource for the player to play from the url
    const url = player.getQueue().shift();
    const stream = ytdl(url, {filter: 'audioonly', quality: 'highestaudio'});
    const resource = createAudioResource(stream);
    player.play(resource);

    await interaction.channel.send(`Playing audio: ${url}`);
    console.log("'play/playQueue': Playing audio; reply sent.");

    player.getPlayer().on('error', error => {
        console.log(`[ERROR] 'play/playQueue': ${error.message}`);
        interaction.channel.send('**An error occured with the current audio, skipping to next.**');
        console.log("'play/playQueue': Recovering from error, moving to next queue item.");
        playQueue(interaction);
    });

    // Begin next track once audio stops
    player.getPlayer().once(AudioPlayerStatus.Idle, () => {
        playQueue(interaction);
    })
}