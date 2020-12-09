require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
    partials:['MESSAGE', 'REACTION']
});
const PREFIX = "$";


// CLIENT READY AND BOT ACTIVITY
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Whale Sounds", {type: "LISTENING"});
});


// CUSTOM COMMANDS.
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
});

// MESSAGE HANDLER TO BAN ANY USERS WHO USE INAPPROPRIATE LANGUAGE.
client.on ('message', async (message) => {
    if (message.author.bot) return;
        if (message.content.toLowerCase() === 'banpls' || message.content.toLowerCase() === 'kanker' || message.content.toLowerCase() === 'slet') {
            try {
                const user = await message.guild.members.ban(message.author.id);
                message.channel.send('Succesfully banned a user for "Inapropriate behavior"')
            } catch (err) {
                console.log(err);
                message.channel.send('something went wrong..')
            }
        }
});

// CUSTOM MESSAGE RESPONSES.
client.on('message', (message) => {
    if (message.author.bot) return;
        // Wat is Mila?
        if (message.content === 'WAT IS MILA'.toLowerCase()) {
            message.reply(`nou ${message.author.username}, Mila is de allerliefste allermooiste aller slimste persoon in deze server... Nee okay, de slimste is nog wel debatable.`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Wat is Vincent?
        if (message.content === 'WAT IS VINCENT'.toLowerCase()) {
            message.reply(`nou ${message.author.username}, Vincent is een big boy :sunglasses:`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Wat is Arissa?
        if (message.content === 'WAT IS ARISSA'.toLowerCase()) {
            message.reply(`nou ${message.author.username}, Arissa is een bad meme dealer :rage:`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Wat is Isabel?
        if (message.content === 'WAT IS ISABEL'.toLowerCase()) {
            message.reply(`nou ${message.author.username}, Isabel heeft typ aids.`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }
});

// EMOJI ROLES ADD.
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    // Retarted Twats Roles
    if (reaction.message.id === '784396444643491850') {
        switch (name) {
            case '⌨️':
                member.roles.add('771743720915075164');
                break;
            case '🎮':
                member.roles.add('771743785448505405');
                break;
            case '🕹️':
                member.roles.add('771758719906218016');
                break
            case '📺':
                member.roles.add('771751184495149076');
                break;
            case '🇳🇱':
                member.roles.add('771742559213977670');
                break;
        }
    }
});

// EMOJI ROLES Remove.
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    // Retarted Twats Roles
    if (reaction.message.id === '784396444643491850') {
        switch (name) {
            case '⌨️':
                member.roles.remove('771743720915075164');
                break;
            case '🎮':
                member.roles.remove('771743785448505405');
                break;
            case '🕹️':
                member.roles.remove('771758719906218016');
                break
            case '📺':
                member.roles.remove('771751184495149076');
                break;
            case '🇳🇱':
                member.roles.remove('771742559213977670');
                break;
        }
    }
});


// CLIENT LOGIN
client.login(process.env.DISCORD_BOT_TOKEN);