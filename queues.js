// Pair in form channelId : queue[]
const queues = new Map();

// Purpose: Create individual queue for particular channel; prevent same audio playing on two different channels via shared resources
// Indirectly related to players through the common identifier that is channelId
function addToQueue(channelId, url){
    var newQueue = [];
    if (queues.has(channelId)){
    newQueue = queues.get(channelId);
    }
    newQueue.push(url);
    queues.set(channelId, newQueue);
}

module.exports = { queues, addToQueue };