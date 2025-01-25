# A Youtube Audio Bot For Discord

NOTE: while this note exists the project does not work and is a wip

A simple bot for playing audio from youtube in your discord voice channel.

# Usage

First, donwload the repository through the cli:
```
git clone PLACEHOLDER FOR URL - CHANGE LATER
```

Create the discord app for personal use, you can find instructions on the [discord developer portal](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app).

You will then need to create a '.env' in the same directory as 'ytbot.js' and type into it:
```
APP_TOKEN=your_key_here
```

Then start the application.

## Requirements

Modules [discord.js](https://www.npmjs.com/package/discord.js?activeTab=readme) and [dotenv](https://www.npmjs.com/package/dotenv) are required.

To install with npm simply type in the cli:
```
npm install discord.js dotenv
```

### Why These Dependencies?
discord.js is of course for interacting with the discord api in js, dotenv is for making it easier to access environment variables from your .env file (where the app token is stored and accessed from).