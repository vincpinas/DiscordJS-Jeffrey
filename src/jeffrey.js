require('dotenv').config();

const { Client, Attachment } = require('discord.js');
const client = new Client({
    partials:['MESSAGE', 'REACTION']
});
const PREFIX = "$";

var jeffreyversion = "1.4"

var servers = {};

const ytdl = require("ytdl-core")

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
        } else if (CMD_NAME === 'ban') { // Settings for Custom BAN command.
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
        if (message.content.toLowerCase() === "homo" || message.content.toLowerCase() === "slet") {
            try {
                const user = await message.guild.members.ban(message.author.id);
                message.channel.send('Succesfully kicked a user for "Inapropriate behavior"')
                message.guild.members.unban(message.author.id);
            } catch (err) {
                console.log(err);
                message.channel.send('something went wrong..')
            }
        }
});




// CUSTOM MESSAGE RESPONSES.
client.on('message', (message) => {
    if (message.author.bot) return;
        // Je Moeder Response
        if (message.content.toUpperCase() === 'JE MOEDER') {
            message.channel.send(`okay ${message.author.username}, ook jou dikke olifant mama`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Waarom? Response
        if (message.content.toUpperCase() === 'WAAROM?') {
            message.channel.send(`Omdat het kan.`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Lag/Lagging Response
        if (message.content.toUpperCase() === 'LAG') {
            message.channel.send(`It's not my fault you're on McDonalds internet ${message.author.username}`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Who are You?
        if (message.content.toUpperCase() === 'WHO ARE YOU?') {
            const thisguild = message.guild;
            const owner = thisguild.owner.user.username;
            message.channel.send(`I'm V.I.D.A the personal assistant of ${message.guild.owner.user.username}`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // What does VIDA stand for?
        if (message.content.toUpperCase() === 'VIDA?') {
            message.channel.send(`V.I.D.A Stands for "Vincent's Personal Discord Assistant"`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // PeePee Response
        if (message.content.toUpperCase() === 'PEEPEE') {
            message.channel.send(`PooPoo, ${message.author.username}?`, {files: ["src/images/coolcat.jpg"]})
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Kinda Cringe Response
        if (message.content.toUpperCase() === 'KINDA CRINGE') {
            message.channel.send(`You're cringe ${message.author.username}`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }

        // Current Version
        if (message.content.toUpperCase() === 'CURRENT VERSION?' || message.content.toUpperCase() === 'CURRENT V?' || message.content.toUpperCase() === 'WHAT IS THE CURRENT VERSION?' || message.content.toUpperCase() === 'WHAT IS THE CURRENT V?') {
            message.channel.send(`My current version is ${jeffreyversion}`)
                .catch((err) => message.channel.send('Something went wrong..'));
        }
});


//



// EMOJI ROLES ADD.
client.on('messageReactionAdd', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    // Civilized / Peasant Roles
    if (reaction.message.id === '786990992636117002') {
        switch (name) {
            case '🤓':
                member.roles.add('786990188739952650');
                break;
            case '💩':
                member.roles.add('786990135858167849');
        }
    }


    // Game / Player Roles
    if (reaction.message.id === '787479010791129189') {
        switch (name) {
            case '🧑‍🦽':
                member.roles.add('787477187820519444');
                break;
            case '👶🏾':
                member.roles.add('787479046647840818');
                break;
            case '🇷🇺':
                member.roles.add('787479053891665921');
                break;
            case '🔫':
                member.roles.add('787479056689266698');
                break;
        }
    }
});

// EMOJI ROLES Remove.
client.on('messageReactionRemove', (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    // Civilized / Peasant Roles
    if (reaction.message.id === '786990992636117002') {
        switch (name) {
            case '🤓':
                member.roles.remove('786990188739952650');
                break;
            case '💩':
                member.roles.remove('786990135858167849');
        }
    }


    // Game / Player Roles
    if (reaction.message.id === '787479010791129189') {
        switch (name) {
            case '🧑‍🦽':
                member.roles.remove('787477187820519444');
                break;
            case '👶🏾':
                member.roles.remove('787479046647840818');
                break;
            case '🇷🇺':
                member.roles.remove('787479053891665921');
                break;
            case '🔫':
                member.roles.remove('787479056689266698');
                break;
        }
    }
});


// Music Commands

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return

    const args = message.content.substring(PREFIX.length).split(" ")

    if (message.content.toLowerCase().startsWith(`${PREFIX}play`)) {
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.channel.send(`${message.author} you need to be in a voice channel to play music, idiot.`)
        const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT')) return message.channel.send(`I do not have permissions to connect to that voice channel idiot.`)
        if(!permissions.has('SPEAK')) return message.channel.send(`I do not have permissions to speak in the voice channel fucker.`)

        try {
            var connection = await voiceChannel.join()
        } catch (err) {
            console.log(`Caught an error while connecting to the voice channel: ${err}`)
            return message.channel.send(`Connection error caught while joining the voice channel: ${err}`)
        }

        const dispatcher = connection.play(ytdl(args[1]))
        .on('finish', () => {
            voiceChannel.leave()
        })
        .on('error', error => {
            console.log(error)
        })
        dispatcher.setVolumeLogarithmic(5 / 5)
    } else if (message.content.toLowerCase().startsWith(`${PREFIX}stop`)) {
        if(!message.member.voice.channel) return message.channel.send(`${message.author} you need to be in a voice channel to play music, idiot.`)
        message.channel.send("`SEE YA LATER NIG-`")
        message.member.voice.channel.leave()
        return undefined
    }

});

// CLIENT LOGIN
client.login(process.env.BOT_TOKEN);