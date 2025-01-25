# Table of Contents
1. [The General Structure/Framework to Follow](#the-general-structureframework-to-follow)
2. [Setting Up Environment Variables \[IMPORTANT\]](#setting-up-environment-variables)
3. [Good Resources](#good-resources)

# The General Structure/Framework to Follow

Observe the code used to generate the 'test' command.
Code from commands/utility/test.js:
```
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('a command for testing'),
	async execute(interaction) {
		await interaction.reply('Test successful');
	},
};
```

This provides the basic blueprint for creating a simple slash command that responds with text, of course none of the code yet gives an indication on how to use optional parameters (for the url),
I suggest you follow the link under [Good Resources](#good-resources) to see the table of contents that likely provides an answer

You will then need to type:
```
node deploy_commands.js
```
This actually registers the commands so that the user can type and see the command for use within the guild

# Setting Up Environment Variables
For this current iteration of this branch, you will need your:
1. App Token
2. Client Id
3. Guild Id

## App Token & Client/App Id
You get these when creating the app in the developer portal

## Guild Id
To get this, activate developer mode in settings, then right click the server picture on the left and copy Id

## Making Use of These Variables
Create .env in the project directory, and fill in the placeholders:
```
APP_TOKEN=your_app_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

Then it should be done

# Good Resources

A good resource copied from to build and eventually learn from is <https://discordjs.guide>
The structure created from this is one we should follow