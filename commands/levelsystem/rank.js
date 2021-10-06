const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;
const Canvas = require("discord-canvas");
const canvacord = require("canvacord");

const bufferImage = require("buffer-image");

module.exports = {
    name: 'rank',
    description: 'Check your own or others level',
    aliases: [],
    usage: '[rank] or status',
    guildOnly: true,
    args: false,
    execute: async (message, args, client) => {
        const { commands } = message.client;
        setTimeout(() => {

            if (args.length > 1) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                    .addField('Error', 'Use `' + PREFIX + 'rank' + ' [@user]` to see ranks', false)
                    .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }
            if (args.length == 1) {
                if (message.mentions.members) {

                    let target = message.mentions.members.first();
                    if (!target) return message.channel.send("User doesn't exist or you didn't mention anyone");
                    mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' and userid = '${target.id}'`, (err, rows) => {
                        if (err) throw err;

                        let sql;

                        if (rows.length < 1) {

                        } else {
                            mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE id = '${message.guild.id}'`, (err, xprow) => {
                                if (!xprow) return;
                                if (!xprow[0]) return;
                                if (xprow[0].levelsystem == '1') {
                                    let value = parseInt(rows[0].level);
                                    let xp = rows[0].xp;
                                    const nxtLvl = 30 * (Math.pow(2, value) - 1);
                                    console.log(typeof (value))
                                    const rank = new canvacord.Rank()
                                        .setAvatar(target.user.displayAvatarURL({ format: "jpg" }))
                                        .setCurrentXP(parseInt(xp))
                                        .setRequiredXP(parseInt(nxtLvl))
                                        .setStatus(target.user.presence.status)
                                        .setProgressBar("#fc0390", "COLOR")
                                        .setLevel(value)
                                        .setUsername(target.user.username)
                                        .setDiscriminator(target.user.discriminator);

                                    rank.build()
                                        .then(data => {
                                            const attachment = new Discord.MessageAttachment(data, "RankCard.jpg");
                                            message.channel.send(attachment);
                                        });
                                } else {
                                    const cmdHelpEmbed = new Discord.MessageEmbed()
                                        .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                        .addField('Error', 'Use `' + PREFIX + 'leveltoggle' + '` to enable the Levelsystem', false)
                                        .setColor(embedError);
                                    client.channels.cache.get(channelid).send(cmdHelpEmbed);
                                    return
                                }

                            });
                        }
                    });
                    return
                } else {
                    const cmdHelpEmbed = new Discord.MessageEmbed()
                        .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                        .addField('Error', 'User doesn\'t exist or left the server', false)
                        .setColor(embedError);
                    client.channels.cache.get(channelid).send(cmdHelpEmbed);
                    return
                }
            } if (args.length == 0) {
                mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' and userid = '${message.author.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length < 1) {

                    } else {
                        mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE id = '${message.guild.id}'`, (err, xprow) => {
                            if (!xprow) return;
                            if (!xprow[0]) return;
                            if (xprow[0].levelsystem == '1') {
                                let value = parseInt(rows[0].level);
                                let xp = rows[0].xp;
                                const nxtLvl = 30 * (Math.pow(2, value) - 1);
                                const target = message.member;
                                const rank = new canvacord.Rank()
                                        .setAvatar(message.author.displayAvatarURL({ format: "jpg" }))
                                        .setCurrentXP(parseInt(xp))
                                        .setRequiredXP(parseInt(nxtLvl))
                                        .setStatus(target.user.presence.status)
                                        .setProgressBar("#fc0390", "COLOR")
                                        .setLevel(value)
                                        .setUsername(target.user.username)
                                        .setDiscriminator(target.user.discriminator);

                                    rank.build()
                                        .then(data => {
                                            const attachment = new Discord.MessageAttachment(data, "RankCard.jpg");
                                            message.channel.send(attachment);
                                        });
                            } else {
                                const cmdHelpEmbed = new Discord.MessageEmbed()
                                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                    .addField('Error', 'Use `' + PREFIX + 'leveltoggle' + '` to enable the Levelsystem', false)
                                    .setColor(embedError);
                                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                                return
                            }

                        });
                    }
                });

            }
        });
    }
}