// Creates shared module so that play.js and stop.js have the same player, meaning that actions across both affect the same player
const { createAudioPlayer } = require('@discordjs/voice');
const player = createAudioPlayer();

module.exports = { player };