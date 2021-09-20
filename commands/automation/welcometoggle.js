const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'welcometoggle',
	description: 'Toggle the Welcome Message function',
	aliases: [],
	usage: '',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;
		let channelid = message.channel.id;

		// Check Bot is Bind to a Channel
		mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${message.guild.id}'`, (err, rows) => {
            if (err) throw err;
    
            let sql;

            if (rows.length < 1) {

			 } else {
                let value = rows[0].generellbouncechannel;
				if (value === null) {

				} else {
					channelid = value;
					if (!message.guild.channels.cache.get(channelid)) {
						channelid = message.channel.id;
						const cmdHelpEmbed = new Discord.MessageEmbed()
						.setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
						.addField('**__NOTE__**', 'The bind channel of the bot was not recognised or deleted. Reconnect it to a channel or reset it.', false)
						.setColor(embedError);
						client.channels.cache.get(channelid).send(cmdHelpEmbed);
						return
					}
				}
            }
        });

        setTimeout(() => {

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
                .addField('Error', NOPERMS, false)
                .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }
    
            if (!args.length) {

                mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${message.guild.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length < 1) {

                    } else {
                        let value = rows[0].welcometoggle;
                        if (value === null) {

                        } else {

                            if (value === 'on') {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The welcome function is now switched **off**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE botsettings SET welcometoggle = '` + 'off' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            } else {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The welcome function is now switched **on**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE botsettings SET welcometoggle = '` + 'on' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            }

                        }
                    }
                });
            }

        }, 1000);

	},
};