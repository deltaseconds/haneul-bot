const Discord = require('discord.js');
const mysqlhandler = require("../handler/mysql.js");
const { PREFIX } = require('../utils/config.json');

module.exports = {
	event: 'message',
	run: async (message, client) => {
		if (!message.content.startsWith(PREFIX) || message.author.bot) return;
		const args = message.content.slice(PREFIX.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return;

		if (command.guildOnly && message.channel.type !== 'text') {
			return message.reply("I can't execute that command inside DMs!");
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${PREFIX}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}

		// try {

			// Check Player is Muted
		// 	mysqlhandler.con.query(`SELECT * FROM mute WHERE id = '${message.guild.id}' AND userid = '${message.author.id}'`, (err, rows) => {
		// 		if (err) throw err;
	
		// 		let sql;

		// 		if (rows.length < 1) {

		// 			if(message.content.includes('"')) return message.channel.send('Please refrain from using " in your messages.'); 

					command.execute(message, args, client);
		// 		} else {
					
		// 		}
		// 	});

		// } catch (error) {
		// 	console.error(error);
		// 	message.reply('There was an error trying to execute that command!');
		// }
	},
};
