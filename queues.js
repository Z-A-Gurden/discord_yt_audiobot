const {createAudioResource} = require('@discordjs/voice')
const queues = new Map();

function addToQueue(channelId, url){
    var newQueue = [];
    if (queues.has(channelId)){
    newQueue = queues.get(channelId);
    }
    newQueue.push(url);
    queues.set(channelId, newQueue);
}

module.exports = { queues, addToQueue };