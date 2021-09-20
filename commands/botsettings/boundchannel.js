const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'boundchannel',
	description: 'Binds the bot to a specific channel, mention the same to unbind',
	aliases: [],
	usage: '',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;

		if (message.guild.ownerID !== message.author.id) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
			.addField('Error', NOPERMS, false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}

		if (!args.length) {

			let filter = m => m.author.id === message.author.id

			const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
				.addField('Information', 'Please enter the message ID for the channel\n\nThe setup is automatically cancelled after 20 seconds.\nTo cancel the setup, write `cancel` in the chat.\nTo reset the binds channel enter `reset`', false)
				.setColor(embedColor);

			message.channel.send(cmdHelpEmbed).then(() => {
				message.channel.awaitMessages(filter, {
					max: 1,
					time: 20000,
					errors: ['time']
				})
					.then(message => {
						message = message.first()
						if (message.content === 'cancel') {
							const cmdHelpEmbed = new Discord.MessageEmbed()
							.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
							.addField('Error', 'The setup was cancelled', false)
							.setColor(embedError);
							client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
							return
						}

						if (message.content === 'reset') {
							mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${message.guild.id}'`, (err, rows) => {
								if (err) throw err;

								let sql;

								if (rows.length < 1) {

								} else {
									let value = rows[0].generellbouncechannel;
									if (value === null) {
										const cmdHelpEmbed = new Discord.MessageEmbed()
											.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
											.addField('Information', 'The bot was un-bind to a channel', false)
											.setColor(embedColor);
										client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);

										sql = 'UPDATE botsettings SET generellbouncechannel = ' + null + ' WHERE id=' + message.guild.id;
										mysqlhandler.con.query(sql);
									} else {
										const cmdHelpEmbed = new Discord.MessageEmbed()
											.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
											.addField('Information', 'The bot was un-bind to a channel', false)
											.setColor(embedColor);
										client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);

										sql = 'UPDATE botsettings SET generellbouncechannel = ' + null + ' WHERE id=' + message.guild.id;
										mysqlhandler.con.query(sql);
									}
								}
							});
							return
						}

						if (isNaN(message.content)) {
							const cmdHelpEmbed = new Discord.MessageEmbed()
							.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
							.addField('Error', 'You must enter a ChannelID. Example: `868925353043841035`', false)
							.setColor(embedError);
							client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
							return
						}

						if (!message.guild.channels.cache.get(message.content)) {
							const cmdHelpEmbed = new Discord.MessageEmbed()
							.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
							.addField('Error', 'The setup was aborted because there is no channel with this ID.', false)
							.setColor(embedError);
							client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
							return
						}

						mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${message.guild.id}'`, (err, rows) => {
							if (err) throw err;

							let sql;

							if (rows.length < 1) {

							} else {
								let value = rows[0].generellbouncechannel;
								if (value === null) {
									const cmdHelpEmbed = new Discord.MessageEmbed()
										.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
										.addField('Information', 'The bot was re-bind to a channel', false)
										.addField('Channelname', '<#' + message.content + '>', false)
										.addField('ChannelID', '`' + message.content + '`', false)
										.setColor(embedColor);
									client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);

									sql = `UPDATE botsettings SET generellbouncechannel = '` + message.content + `' WHERE id='${message.guild.id}'`;
									mysqlhandler.con.query(sql);
								} else {
									const cmdHelpEmbed = new Discord.MessageEmbed()
										.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
										.addField('Information', 'The bot was re-bind to a channel', false)
										.addField('Channelname', '<#' + message.content + '>', false)
										.addField('ChannelID', '`' + message.content + '`', false)
										.setColor(embedColor);
									client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);

									sql = `UPDATE botsettings SET generellbouncechannel = '` + message.content + `' WHERE id='${message.guild.id}'`;
									mysqlhandler.con.query(sql);
								}
							}
						});


					})
					.catch(collected => {
						const cmdHelpEmbed = new Discord.MessageEmbed()
						.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
						.addField('Error', 'The setup was cancelled for safety reasons.', false)
						.setColor(embedError);
						client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
					});
			})
			return
		}
	},
};