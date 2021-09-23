const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'quit_toggle',
	description: 'Toggle the Quit Message function',
	aliases: [],
	usage: '',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;
		let channelid = message.channel.id;

		// Check Bot is Bind to a Channel
		mysqlhandler.con.query(`SELECT * FROM haneul_quit WHERE id = '${message.guild.id}'`, (err, rows) => {
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
						.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
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
                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
                .addField('Error', NOPERMS, false)
                .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }
    
            if (!args.length) {

                mysqlhandler.con.query(`SELECT * FROM haneul_quit WHERE id = '${message.guild.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length < 1) {

                    } else {
                        let value = rows[0].quit_toggle;
                        if (value === null) {

                        } else {

                            if (value == '1') {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The quit function is now switched **off**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE haneul_quit SET quit_toggle = '` + '0' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            } 
                            if (value == '0') {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The quit function is now switched **on**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE haneul_quit SET quit_toggle = '` + '1' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            }

                        }
                    }
                });
            }

        }, 1000);

	},
};