const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
    name: 'ban',
    description: 'Ban a User',
    aliases: [],
    usage: '<@user> <reason>',
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

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
                .addField('Error', NOPERMS, false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        if (!args.length) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'Use `' + PREFIX + 'ban' + ' <@user> <reason>` to ban a User', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        let user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        if (!user || !reason) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'Use `' + PREFIX + 'ban' + ' <@user> <reason>` to ban a User', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        if (message.guild.member(user).hasPermission("BAN_MEMBERS")) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'You cannot ban that person', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
            .addField('Information', 'User was banned', false)
            .addField('User', '' + user.username + '', false)
            .addField('Reason', '' + reason + '', false)
            .setImage('https://c.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif')
            .setColor(embedColor);
        client.channels.cache.get(channelid).send(cmdHelpEmbed);

        message.guild.member(user).ban({reason: reason})

    },
};