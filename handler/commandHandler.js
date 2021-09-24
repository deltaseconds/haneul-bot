const ascii = require('ascii-table');
const commandCheck = require('./../utils/commandCheck');
const { CONSOLEPREFIX } = require('./../utils/config.json');

module.exports = (cmdfile, client) => {
	try {
		const command = require(`${cmdfile}`);
		if (commandCheck(command.name, command)) {
			if (command.name) {
				client.commands.set(command.name, command);
				console.log(CONSOLEPREFIX + 'Command ' + command.name + ' (' + command.name + '.js) was registered')
				if (command.aliases && Array.isArray(command)) {
					command.aliases.foreach((alias) =>
						client.aliases.set(alias, command.name)
					);
				}
			} else {
				console.log(CONSOLEPREFIX + 'Command (' + command.name + ') was not registered')
			}
		}
	} catch (error) {
		
		
		console.log(CONSOLEPREFIX + '[ERROR] Commandfile (' + cmdfile + ') not found')
		console.log(error);
	}

};
