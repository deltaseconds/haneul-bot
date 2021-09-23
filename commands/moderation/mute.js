const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
    name: 'mute',
    description: 'Mute a User',
    aliases: [],
    usage: '<@user> <reason>',
    guildOnly: true,
    args: false,
    execute: async (message, args, client) => {
        const { commands } = message.client;
        let channelid = message.channel.id;
 

        setTimeout(() => {

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                    .setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
                    .addField('Error', NOPERMS, false)
                    .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }

            if (!args.length) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                    .addField('Error', 'Use `' + PREFIX + 'mute' + ' <@user> <reason>` to mute a User', false)
                    .addField('Optional', 'Use `' + PREFIX + 'mute' + ' <@user> status` to see the status of the user', false)
                    .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }

            let user = message.mentions.users.first();


            // Check Status is Muted or Not
            if (args[1] === 'status') {
                mysqlhandler.con.query(`SELECT * FROM mute WHERE id = '${message.guild.id}' AND userid = '${user.id}'`, (err, rows) => {
                    if (err) throw err;

                    let sql;

                    if (rows.length < 1) {

                        const cmdHelpEmbed = new Discord.MessageEmbed()
                            .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                            .addField('Error', 'The user is not muted', false)
                            .setColor(embedError);
                        client.channels.cache.get(channelid).send(cmdHelpEmbed);

                    } else {
                        let reasondb = rows[0].reason;
                        let mutedby = rows[0].mutedby;

                        const cmdHelpEmbed = new Discord.MessageEmbed()
                            .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                            .addField('Information', 'The User is currently muted', false)
                            .addField('User', '' + user.username + '', false)
                            .addField('By', '<@' + mutedby + '>', false)
                            .addField('Reason', '' + reasondb + '', false)
                            .setColor(embedColor);
                        client.channels.cache.get(channelid).send(cmdHelpEmbed);
                    }
                });
                return
            }

            let reason = args.slice(1).join(" ");

            if (!user || !reason) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                    .addField('Error', 'Use `' + PREFIX + 'mute' + ' <@user> <reason>` to mute a User', false)
                    .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }


            if (message.guild.member(user).hasPermission("BAN_MEMBERS")) {
                const cmdHelpEmbed = new Discord.MessageEmbed()
                    .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                    .addField('Error', 'You cannot mute that person', false)
                    .setColor(embedError);
                client.channels.cache.get(channelid).send(cmdHelpEmbed);
                return
            }


            mysqlhandler.con.query(`SELECT * FROM mute WHERE id = '${message.guild.id}' AND userid = '${user.id}'`, (err, rows) => {
                if (err) throw err;

                let sql;

                if (rows.length < 1) {

                    const cmdHelpEmbed = new Discord.MessageEmbed()
                        .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                        .addField('Information', 'User was muted', false)
                        .addField('User', '' + user.username + '', false)
                        .addField('Reason', '' + reason + '', false)
                        .setImage('https://c.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif')
                        .setColor(embedColor);
                    client.channels.cache.get(channelid).send(cmdHelpEmbed);

                    sql = `INSERT INTO mute (id, userid, reason, mutedby) VALUES ('${message.guild.id}', '${user.id}', '${reason}', '${message.author.id}')`;
                    mysqlhandler.con.query(sql);

                } else {
                    let reasondb = rows[0].reason;
                    let mutedby = rows[0].mutedby;

                    const cmdHelpEmbed = new Discord.MessageEmbed()
                        .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                        .addField('Information', 'The user is already muted', false)
                        .addField('User', '' + user.username + '', false)
                        .addField('By', '<@' + mutedby + '>', false)
                        .addField('Reason', '' + reasondb + '', false)
                        .setColor(embedError);
                    client.channels.cache.get(channelid).send(cmdHelpEmbed);

                }
            });


        }, 1000);

    },
};