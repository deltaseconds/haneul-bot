const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;
const Canvas = require("discord-canvas");

const bufferImage = require("buffer-image");

module.exports = {
    name: 'rank',
    description: 'Check your own or others level',
    aliases: [],
    usage: '[levelmessage] or status',
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
            if(args.length == 1) {
                if (message.mentions.members) {
                    
                    let target = message.mentions.members.first();
                    if (!target) return message.channel.send("User doesn't exist or you didn't mention anyone");
                    mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' and userid = '${target.id}'`, (err, rows) => {
                        if (err) throw err;
    
                        let sql;
    
                        if (rows.length < 1) {
    
                        } else {
                            mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE id = '${message.guild.id}'`, (err, xprow) => {
                                if(!xprow) return;
                                if(!xprow[0]) return;
                                if(xprow[0].levelsystem == '1') {
                                    let value = rows[0].level;
                                    let xp = rows[0].xp;
                                    const nxtLvl = 300 * (Math.pow(2, value) - 1);
                                    const image = new Canvas.RankCard()
                                        .setAvatar(target.user.displayAvatarURL())
                                        .setXP("current", xp)
                                        .setXP("needed", nxtLvl)
                                        .setLevel(value)
                                        .setRankName(message.guild.name)
                                        .setUsername(target.user.tag)
                                        .setBackground(xprow[0].level_image)
                                        .toAttachment();
                                    const attachment = new Discord.MessageAttachment(image.toBuffer(), "rank-card.png");
                                    client.channels.cache.get(channelid).send(attachment);
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
            } if(args.length == 0) {
                mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' and userid = '${message.author.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;
                    
                    if (rows.length < 1) {

                    } else {
                        mysqlhandler.con.query(`SELECT * FROM haneul_xp WHERE id = '${message.guild.id}'`, (err, xprow) => {
                            if(!xprow) return;
                            if(!xprow[0]) return;
                            if(xprow[0].levelsystem == '1') {
                                let value = rows[0].level;
                                let xp = rows[0].xp;
                                const nxtLvl = 300 * (Math.pow(2, value) - 1);
                                const image = new Canvas.RankCard()
                                    .setAvatar(message.author.displayAvatarURL())
                                    .setXP("current", xp)
                                    .setXP("needed", nxtLvl)
                                    .setLevel(value)
                                    .setRankName(message.guild.name)
                                    .setUsername(message.author.tag)
                                    .setBackground(xprow[0].level_image)
                                    .toAttachment();
                                    var buf = Buffer.from(JSON.stringify(image));
                                const attachment = new Discord.MessageAttachment(buf, "rank-card.png");
                                client.channels.cache.get(message.channel.id).send(attachment);
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