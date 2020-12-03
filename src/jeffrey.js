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
client.on('message', async (message) => {
    if (message.author.bot) return; // .bot is a boolean, incase the bot sends a message it returns so anything after it doens't run so it doesn't spam because of itself.
    if (message.content.startsWith(PREFIX)) { // Check if the message starts with the prefix before doing anything else.
            const [CMD_NAME, ...args] = message.content // Take the Name of the command and any arguments passed to it in a list, seperate them using the seperator(...)
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
        } else if (CMD_NAME === 'ban') {
            if (!message.member.hasPermission('BAN_MEMBERS'))
                return message.reply('Insufficient permission')
            if (args.length === 0) return message.reply("Please provide a user ID");
            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send('User successfully banned');
            } catch (err) {
                console.log(err);
                message.channel.send('Error occured. Either no user has been found or I have insufficient permissions')
            }
        }
    }

    // Message handler to ban any users who use inappropriate language.
    if (message.content === 'kanker', 'slet', 'hoer', 'homo') {
        try {
            const user = await message.guild.members.ban(message.author.id);
        } catch (err) {
            console.log(err)
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);