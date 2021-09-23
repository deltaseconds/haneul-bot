const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;


module.exports = {
	name: 'leveltoggle',
	description: 'Toggle the leveling system',
	aliases: [],
	usage: '',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;
		let channelid = message.channel.id;

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

                mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE id = '${message.guild.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length < 1) {

                    } else {
                        let value = rows[0].levelsystem;
                        if(!value) return;
                            if (value == '1') {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The level system is now turned **off**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE haneul_xp SET levelsystem = '` + '0' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            } 
                            if (value == '0') {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Successfully', 'The level system is now turned **on**', false)
                                .setColor(embedColor);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);

                                sql = `UPDATE haneul_xp SET levelsystem = '` + '1' + `' WHERE id='${message.guild.id}'`;
                                mysqlhandler.con.query(sql);
                            }

                        
                    }
                });
            }

        }, 1000);

	},
};