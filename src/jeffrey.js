require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$";


// LOGIN AND BOT ACTIVITY
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Whale Sounds", {type: "LISTENING"});
});


// Custom Commands
client.on('message', (message) => {
    if (message.author.bot) return; // .bot is a boolean, incase the bot sends a message it returns so anything after it doens't run so it doesn't spam because of itself.
    if (message.content.startsWith(PREFIX)) { // Split the custom prefix from the command in the message it grabbed from discord.
            const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
    
        if (CMD_NAME === 'kick') { // Settings for Custom KICK command.
            if (!message.member.hasPermission('KICK_MEMBERS'))
                return message.reply('Insufficient permission')
            if (args.length === 0) return message.reply("Please provide a user ID");
            const member = message.guild.members.cache.get(args[0]);
            if (member) {
                member
                    .kick()
                    .then((member) => message.channel.send(`@everyone ${member} has been kicked.`))
                    .catch((err) => message.reply('I cannot kick that user'));
            } else {
                message.reply("the provided member does either not exist or is not in this server.");
            }
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);