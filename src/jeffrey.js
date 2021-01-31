require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
    partials:['MESSAGE', 'REACTION']
});
const PREFIX = "$";

var jeffreyversion = "1.4.2"

const ytdl = require("ytdl-core")

// CLIENT READY AND BOT ACTIVITY
client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("Whale Sounds", {type: "LISTENING"});
});


// CUSTOM COMMANDS.
client.on('message', async (message) => {
    if (message.author.bot) return; 
    if (message.content.startsWith(PREFIX)) { 
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
// If any of the items in the swearwords list are a match it autobans them.
const swearwords = ["nigger", "neger", "anus", "faggot"];

client.on ('message', async (message) => {
    if (message.author.bot) return;
        let swearindex = swearwords.indexOf(message.content.toLowerCase())
        if (message.content.toLowerCase() === swearwords[swearindex]) {
            try {
                const user = await message.guild.members.ban(message.author.id);
                message.channel.send('Succesfully kicked a user for "Inapropriate behavior"')
                message.guild.members.unban(message.author.id);
            } catch (err) {
                console.log(err);
                message.channel.send('something went wrong..')
            }
        }
})




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

        // Are you okay?
        if (message.content.toUpperCase() === 'ARE YOU OKAY?') {
            message.channel.send(`Honestly? not really :pensive:`)
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
// Server Queue
const servers = {};

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return

    const voiceChannel = message.member.voice.channel
    const args = message.content.substring(PREFIX.length).split(" ")

    args[0] = args[0].toLowerCase()

    switch (args[0]) {
        case 'play':
            // Check if a youtube link was passed in or not.
            const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/g;
            let linkver = args[1].match(regex)

            if (linkver == null) return message.channel.send(`Please pass in a valid YouTube link, ${message.author.username}`);

            // Play Function
            const play = (connection, message) => {
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}));
    
                server.queue.shift();
    
                server.dispatcher.on("finish", () => {
                    if(server.queue[0]) {
                        play(connection, message);
                    } else {
                        connection.disconnect();
                    }
                });
            }
    
            // Aditional Necessary checks and setup.
            if(!args[1]) return message.channel.send(`I'm sorry ${message.author.username}, you still need to provide a link.`)

            if(!voiceChannel) return message.channel.send(`${message.author.username} you need to be in a voice channel to play music.`)
    
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);
    
            // If not in the voice channel yet, join and exec the func otherwise, do everything except this.
            if(!message.guild.voice) voiceChannel.join().then((connection) => {
                play(connection, message);
            })

        break;


        case 'skip':
            var server = servers[message.guild.id];
            try {
                if (!message.member.voice.channel) return message.channel.send(`I'm sorry ${message.author.username} but you're not a channel like you are supposed to be.`)
                if(server.dispatcher) server.dispatcher.end();
            } catch(err) {
                console.log(err)
                message.channel.send(`There is currently no available dispatcher for this server, please start by using the play command before trying to skip.`)
            }
        break;


        case 'queue':
            var server = servers[message.guild.id];
            try {
                if (server.queue.length === 0) {
                    message.channel.send(`There is currently nothing in the queue.`)
                } else {
                    message.channel.send(`Next up:`)
                    server.queue.map(async(item, index) => {
                        let count = index + 1
                        let info = await ytdl.getBasicInfo(server.queue[index])
                        message.channel.send(`${count}. ${info.videoDetails.media.song} by ${info.videoDetails.media.artist}`)
                    })
                }
            } catch(err) {
                message.channel.send(`There is currently no queue, please use the play command to start adding songs.`)
            }
        break;

        case 'stop':
            var server = servers[message.guild.id];
            if(message.guild.voice) {
                for(let i = server.queue.length -1; i >=0; i--) server.queue.splice(i, 1);
            }

            server.dispatcher.end();
            message.channel.send(`The queue has been stopped.`)
        break;
    }
});

// CLIENT LOGIN
client.login(process.env.BOT_TOKEN);