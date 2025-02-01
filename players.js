// Creates shared module so that play.js and stop.js have the same player, meaning that actions across both affect the same player
const { createAudioPlayer } = require('@discordjs/voice');

// Pair in form channelId : player
const players = new Map();

function addPlayer(channelId){
    // Purpose: Create individual player for particular channel; prevent same audio playing on two different channels via shared resources
    if(players.has(channelId)){
        return;
    }
    players.set(channelId, createAudioPlayer());
}

module.exports = { players, addPlayer };