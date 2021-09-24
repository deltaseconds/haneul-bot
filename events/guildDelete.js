const Discord = require('discord.js');
const mysqlhandler = require("../handler/mysql.js");
const setup_generell = require("../handler/setup_generell.js");
const { PREFIX, COLORS, VERSION, NOPERMS, CONSOLEPREFIX } = require('../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	event: 'guildDelete',
	run: async (guild) => {
        console.log(CONSOLEPREFIX + `I have been removed from: ${guild.name} (id: ${guild.id})`);
        setup_generell.deleteguild("haneul_quit", guild.id);
		setup_generell.deleteguild("haneul_welcome", guild.id);
	},
};
