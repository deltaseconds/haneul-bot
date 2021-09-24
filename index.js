const Discord = require("discord.js");
const fs = require('fs');

const Canvas = require("discord-canvas");

// Import Files
const config = require("./utils/config.json");

// Import Handler
const mysqlhandler = require("./handler/mysql.js");

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

// All Commands and Events
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./events/', (err, files) => {
	const eventHandler = require('./handler/eventHandler.js');
	eventHandler(err, files, client);
});

const commandHandler = require('./handler/commandHandler.js');
console.log('\n----------------------------[COMMAND STATE]----------------------------\n');
// Global
commandHandler('./../commands/help.js', client);
// Moderation
commandHandler('./../commands/moderation/clear.js', client);
commandHandler('./../commands/moderation/mute.js', client);
commandHandler('./../commands/moderation/unmute.js', client);
commandHandler('./../commands/moderation/kick.js', client);
commandHandler('./../commands/moderation/ban.js', client);
// Automation
commandHandler('./../commands/automation/quitchannel.js', client);
commandHandler('./../commands/automation/quitimage.js', client);
commandHandler('./../commands/automation/quitmessage.js', client);
commandHandler('./../commands/automation/quittoggle.js', client);

commandHandler('./../commands/automation/welcomechannel.js', client);
commandHandler('./../commands/automation/welcomeimage.js', client);
commandHandler('./../commands/automation/welcomemessage.js', client);
commandHandler('./../commands/automation/welcometoggle.js', client);
// Level 
commandHandler('./../commands/levelsystem/levelchannel.js', client);
commandHandler('./../commands/levelsystem/levelimage.js', client);
commandHandler('./../commands/levelsystem/levelmessage.js', client);
commandHandler('./../commands/levelsystem/leveltoggle.js', client);
commandHandler('./../commands/levelsystem/rank.js', client);
// Anime
commandHandler('./../commands/anime/anime.js', client);
commandHandler('./../commands/anime/manga.js', client);
console.log('\n----------------------------[COMMAND STATE]----------------------------\n');

// Bot Started
client.on('ready', () => {
	console.log(config.CONSOLEPREFIX + `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

	client.user.setActivity(`Haneul A.I.`, { type: "WATCHING" });

	mysqlhandler.connect();

	setInterval(() => {
		mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE 1`, (err, rows) => {

		});
	}, 14400000);
});

client.login(config.BOT_TOKEN);