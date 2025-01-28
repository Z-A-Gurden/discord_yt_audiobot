# A Youtube Audio Bot For Discord

NOTES:
- Major issue where audio randomly cuts, chances of it happening and when it happens within a video varies even when playing the same audio. There is error catching in place to prevent crash and move on to
  the next song.
- This is a project for learning, fun, and mainly personal use. Don't expect a high quality program, because it is not.

A simple bot for playing audio from youtube in your discord voice channel.

# Usage

First, download the repository through the cli:
```
git clone https://github.com/Z-A-Gurden/discord_yt_audiobot.git
```

Create the discord app for personal use, you can find instructions on the [discord developer portal](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app).

You will then need to create a '.env' in the same directory as 'ytbot.js' and type into it:
```
APP_TOKEN=your_key_here
```

You will then need to register the slash commands using the deploy-commands.js file provided, run:
```
node deploy-commands.js
```

Then start the application by running:
```
node ytbot.js.js
```

## Requirements

Modules [discord.js](https://www.npmjs.com/package/discord.js?activeTab=readme), [@discordjs/voice](https://www.npmjs.com/package/@discordjs/voice), [dotenv](https://www.npmjs.com/package/dotenv), and [@distube/ytdl-core](https://www.npmjs.com/package/@distube/ytdl-core) are required.

To install with npm simply type in the cli within the app directory:
```
npm install .
```