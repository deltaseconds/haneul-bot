const Discord = require('discord.js');
const mysqlhandler = require("../handler/mysql.js");
const setup_generell = require("../handler/setup_generell.js");
const { PREFIX, COLORS, VERSION, NOPERMS, CONSOLEPREFIX } = require('../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	event: 'guildCreate',
	run: async (guild) => {
        console.log(CONSOLEPREFIX + `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        setup_generell.set("haneul_welcome", guild.id);
		setup_generell.set("haneul_quit", guild.id);

		const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
		const cmdHelpEmbed = new Discord.MessageEmbed()
		.setAuthor('Haneul A.I. (' + VERSION + ') - Information', 'https://media.discordapp.net/attachments/698166123874615326/873351999419203614/246880.png?width=895&height=671')
		.addField('Welcome!', '**Thanks for inviting me**', false)
		.addField('**__NOTE__**', 'You can also find out more details\nabout the command with `ai-help [command]`.', false)
		.setColor(embedColor);
		channel.send(cmdHelpEmbed)
	},
};
