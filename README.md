# A Youtube Audio Bot For Discord

NOTES:
- Major issue where audio randomly cuts, chances of it happening and when it happens within a video varies even when playing the same audio. There is error catching in place to prevent a crash and move onto the next song in queue if there is any.
- This is a project for learning, fun, and mainly personal use. Don't expect a high quality program.

A simple bot for playing audio from youtube in your discord voice channel.

# Usage

First, download the repository:
```
git clone https://github.com/Z-A-Gurden/discord_yt_audiobot.git
```

Create a discord app in the discord developer portal, you can find instructions on the [discord developer portal](https://discord.com/developers/docs/quick-start/getting-started#step-1-creating-an-app).

You will then need to create a '.env' in the same directory as 'ytbot.js' and type into it:
```
APP_TOKEN=your_key_here
CLIENT_ID=your_key_here
```

You can find both of these after creating your discord app.

You will then need to register the slash commands using the deploy-commands.js file provided, run:
```
node deploy-commands.js
```

Then start the application by running:
```
node index.js
```

## Requirements

Dependencies can be observed within package.json.

To install with npm simply type in the cli within the app directory:
```
npm install .
```