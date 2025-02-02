const { createAudioPlayer } = require('@discordjs/voice');

// Pair in form channelId : player
const players = new Map();

// Purpose: Create individual player for particular channel; prevent same audio playing on two different channels via shared resources
// Indirectly related to queues through the common identifier that is channelId
function addPlayer(channelId){
    if(players.has(channelId)){
        return;
    }
    players.set(channelId, createAudioPlayer());
}

module.exports = { players, addPlayer };