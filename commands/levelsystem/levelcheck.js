const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

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
            if(args.length = 1) {
                if (message.mentions.members) {
                    let target = message.mentions.members.first();
                    if (member.user.bot) return;
                    mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' and userid = '${target.id}'`, (err, rows) => {
                        if (err) throw err;
    
                        let sql;
    
                        if (rows.length < 1) {
    
                        } else {
                            let value = rows[0].level;
                            let xp = rows[0].xp;
                            const cmdHelpEmbed = new Discord.MessageEmbed()
                                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                                .addField('Information', 'Level and XP of <@' + target.id + '>', false)
                                .addField('Message', 'Level ' + value + ' with ' + xp + ' XP', false)
                                .setColor(embedColor);
                            client.channels.cache.get(channelid).send(cmdHelpEmbed);
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
            }
        });
    }
}