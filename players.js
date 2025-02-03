const { createAudioPlayer } = require('@discordjs/voice');

// Delete below if given up on class implementation of this file
// Comment out below to use bot whilst below is not finished
// Purpose: Directly link players and queues. maybe make a player object with .queue member.

class Players{
    static #players = new Map();
    static addPlayer(channelId){
        if(Players.#players.has(channelId)){
            return;
        }
        Players.#players.set(channelId, new Player(channelId));
    }
    static getPlayer(channelId){
        if(!Players.#players.has(channelId)){
            throw new error('No player matching channelId found');
        }
        return Players.#players.get(channelId);
    }
}

class Player{
    #player;
    #queue = [];
    #channelId;

    constructor(channelId){
        this.#player = createAudioPlayer();
        this.#channelId = channelId;
    }

    getState(){
        return this.#player.state.status;
    }
    play(resource){
        this.#player.play(resource);
    }
    pause(){
        if(this.getState() === 'playing'){
            this.#player.pause();
            return 'Paused';
        }
        if(this.getState() === 'paused'){
            this.#player.unpause();
            return 'Resumed';
        }
        return 'Player idle';
    }
    skip(){
        this.#player.stop();
    }
    stop(){
        this.clearQueue();
        this.#player.stop();
    }
    subscribe(connection){
        try{
            if(!connection.state.subscription){
                connection.subscribe(this.#player);
                console.log(`Connection subscribed to player; channelId: ${this.#channelId}`)
            }
        } catch(error){
            throw(error);
        }
    }
    // temp function for use with listeners, replace with different solution later
    getPlayer(){
        return this.#player;
    }

    addToQueue(url){
        this.#queue.push(url);
    }
    getQueue(){
        return this.#queue;
    }
    clearQueue(){
        this.#queue.length = 0;
    }
}

module.exports = Players;
