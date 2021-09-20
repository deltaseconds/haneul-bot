const Discord = require('discord.js');
const mysqlhandler = require("../handler/mysql.js");
const { PREFIX, COLORS, VERSION, IMAGE_HELP, IMAGE_INFOEMBED } = require('./../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'help',
	description: 'Get help on how to use the bot and the specific commands',
	aliases: [],
	usage: '[command name]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;
		let channelid = message.channel.id;

		// Check Bot is Bind to a Channel
		// mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${message.guild.id}'`, (err, rows) => {
        //     if (err) throw err;
    
        //     let sql;

        //     if (rows.length < 1) {

		// 	 } else {
        //         let value = rows[0].generellbouncechannel;
		// 		if (value === null) {

		// 		} else {
		// 			channelid = value;
					// if (!message.guild.channels.cache.get(channelid)) {
						// channelid = message.channel.id;
						// const cmdHelpEmbed = new Discord.MessageEmbed()
						// .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
						// .addField('**__NOTE__**', 'The bind channel of the bot was not recognised or deleted. Reconnect it to a channel or reset it.', false)
						// .setColor(embedError);
						// client.channels.cache.get(channelid).send(cmdHelpEmbed);
						// return
					// }
				// }
            // }
        // });

		setTimeout(() => {

			if (!args.length) {
				const cmdHelpEmbed = new Discord.MessageEmbed()
					.setAuthor('Haneul A.I. (' + VERSION + ') - A list of all available commands', IMAGE_INFOEMBED)
					.setDescription('To check out a section or command use `h!help [command]`.\nExample: `h!help Moderation` or\nfurther information on a command: `h!help clear`.\n\n[[Invite me](https://discord.haneul.xyz)] [[Support via Discord](https://discord.gg/soulparadise)] [[Vote](https://discord.haneul.xyz)]')
					.setColor(embedColor)
					.addFields(
						{ name: '⚙️ Automation', value: '*Automatically do things, like casting roles on join*', inline: true },
						{ name: ':shield: Moderation', value: '*Moderate your server and user!*', inline: true },
						{ name: ':wrench: Bot-Settings', value: '*Bot settings to customize*', inline: true },
						{ name: '<a:gaminggirl:873384224713998376> __Enjoy some fun stuff with all of these sections__', value: '*With these commands, you or your community can fill their free time and do some anime stuff.*' },
						{ name: '<:pinkcoffee:870299980026499113> Profile', value: '*Check out your own profile on Haneul A.I.*', inline: true },
						{ name: ':game_die: Gambling', value: '*Waste your time with gambling*', inline: true },
						{ name: '<a:star:870301063834656788> Anime', value: '*Anime and manga stuff*', inline: true },
						{ name: '**__NOTE__**', value: 'If a channel is missing that had certain functions bind to it, the bot will not return anything. Also be sure to put the bots roles over the level reward roles and give the bot **KICK_MEMBERS, BAN_MEMBERS, MANAGE_MESSAGES, MUTE_MEMBERS, MANAGE_ROLES** permission to flawlessly function.' },
					)
					.setImage(IMAGE_HELP)
					.setTimestamp()
					.setFooter('Support is available at discord.haneul.xyz');
					client.channels.cache.get(channelid).send(cmdHelpEmbed);
				return
			}
	
			const name = args[0].toLowerCase();
	
			// Automation
			if (name === 'automation') {
				const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Automation Section', IMAGE_INFOEMBED)
				.addField('⚙️ ' + PREFIX + 'welcometoggle', '*Toggle the Welcome Channel*', false)
				.addField('⚙️ ' + PREFIX + 'welcomeChannel <#channel>', '*Set the Welcome Channel*', false)
				.addField('⚙️ ' + PREFIX + 'welcomeMessage <#message>', '*Set the Welcome Message*', false)
				.addField('⚙️ ' + PREFIX + 'welcomeImage <url>', '*Set the Welcome BackgroundImage*', false)
				.addField('⚙️ ' + PREFIX + 'quittoggle', '*Toggle the Quit Channel*', false)
				.addField('⚙️ ' + PREFIX + 'quitChannel <#channel>', '*Set the Quit Channel*', false)
				.addField('⚙️ ' + PREFIX + 'quitMessage <#message>', '*Set the Quit Message*', false)
				.addField('⚙️ ' + PREFIX + 'quitImage <url>', '*Set the Quit BackgroundImage*', false)
				.addField('**__NOTE__**', 'You can also find out more details\nabout the command with `h!help [command]`.', false)
				.setImage(IMAGE_HELP)
				.setTimestamp()
				.setColor(embedColor)
				.setFooter('Support is available at discord.haneul.xyz');
				client.channels.cache.get(channelid).send(cmdHelpEmbed);
				return
			}
	 
			// Moderation
			if (name === 'moderation') {
				const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Moderation Section', IMAGE_INFOEMBED)
				.addField(':broom: ' + PREFIX + 'clear', '*Clear the Chat*', false)
				.addField(':mute: ' + PREFIX + 'mute', '*Mute a User*', false)
				.addField(':mute: ' + PREFIX + 'unmute', '*Unmute a User*', false)
				.addField(':no_entry_sign: ' + PREFIX + 'kick', '*Kick a User*', false)
				.addField(':no_entry_sign: ' + PREFIX + 'ban', '*Ban a User*', false)
				.addField('**__NOTE__**', 'You can also find out more details\nabout the command with `h!help [command]`.', false)
				.setImage(IMAGE_HELP)
				.setTimestamp()
				.setColor(embedColor)
				.setFooter('Support is available at discord.haneul.xyz');
				client.channels.cache.get(channelid).send(cmdHelpEmbed);
				return
			}
	
			// Bot Settings
			if (name === 'bot-settings') {
				const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Bot Channel Section', IMAGE_INFOEMBED)
				.addField(':gear: ' + PREFIX + 'boundchannel', '*Binds the bot to a specific channel, mention the same to unbind*', false)
				.addField('**__NOTE__**', 'You can also find out more details\nabout the command with `h!help [command]`.', false)
				.setImage(IMAGE_HELP)
				.setTimestamp()
				.setColor(embedColor)
				.setFooter('Support is available at discord.haneul.xyz');
				client.channels.cache.get(channelid).send(cmdHelpEmbed);
				return
			}
	
			const command =
				commands.get(name) ||
				commands.find((cmd) => cmd.aliases && cmd.aliases.includes(name));
	
			if (!command) {
				const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
				.addField('Error', 'This command does not exist!', false)
				.setColor(embedError);
				client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
				return
			}
			const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Command Information', IMAGE_INFOEMBED)
				.addField('Command', PREFIX + command.name, false)
				.addField('Description', command.description, false)
				.addField('Usage', `\`${PREFIX + command.name} ${command.usage}\``, false)
				.setColor(embedColor);
	
			
			if (command.aliases) {
				if (command.aliases.length < 1) {
					cmdHelpEmbed.addField(
						'Aliases',
						'`No aliases were found for the command`',
						true
					);
				} else {
					cmdHelpEmbed.addField(
						'Aliases',
						`\`${command.aliases.join(' | ')}\``,
						true
					);
				}
			}
			
	
			return client.channels.cache.get(channelid).send(cmdHelpEmbed);

		}, 1000);

	},
};