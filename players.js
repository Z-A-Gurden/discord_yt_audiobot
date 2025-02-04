const { createAudioPlayer } = require('@discordjs/voice');

// Class with a map of all players, and a way to access or add to them
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
// The class of a player held in #players in Players, holds the queue for that player, and offers various functions in relation to the functioning of the player
class Player{
    #player;
    #queue = [];
    #channelId;

    constructor(channelId){
        this.#player = createAudioPlayer();
        this.#channelId = channelId;
    }
    
    // Getters annd Setters
    getState(){ return this.#player.state.status; }
    getQueue(){ return this.#queue; }
    addToQueue(url){ this.#queue.push(url); }
    clearQueue(){ this.#queue.length = 0; }

    play(resource){ this.#player.play(resource); }
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
    skip(){this.#player.stop();}
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
    // temp function for use with listeners, replace with different solution later as the player shouldn't really be accessible
    getPlayer(){return this.#player;}
}

module.exports = Players;
