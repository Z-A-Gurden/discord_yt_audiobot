// Code via https://discordjs.guide/slash-commands/deleting-commands.html#deleting-all-commands
// edited it a bit so that it works with dotenv rather than json
// 
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const token = process.env.APP_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST().setToken(token);

// for guild-based commands
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
    	.then(() => console.log('Successfully deleted all guild commands.'))
	    .catch(console.error);

// for global commands
    rest.put(Routes.applicationCommands(clientId), { body: [] })
	    .then(() => console.log('Successfully deleted all application commands.'))
    	.catch(console.error);