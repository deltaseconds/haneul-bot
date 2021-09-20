const Discord = require('discord.js');
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
    name: 'kick',
    description: 'Kick a User',
    aliases: [],
    usage: '<@user> <reason>',
    guildOnly: true,
    args: false,
    execute: async (message, args, client) => {
        const { commands } = message.client;
        let channelid = message.channel.id;

        if (!message.member.hasPermission("KICK_MEMBERS")) {
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
                .addField('Error', 'Use `' + PREFIX + 'kick' + ' <@user> <reason>` to kick a User', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        let user = message.mentions.users.first();
        let reason = args.slice(1).join(" ");

        if (!user || !reason) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'Use `' + PREFIX + 'kick' + ' <@user> <reason>` to kick a User', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        if (message.guild.member(user).hasPermission("KICK_MEMBERS")) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'You cannot kick that person', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
            .addField('Information', 'User was kicked', false)
            .addField('User', '' + user.username + '', false)
            .addField('Reason', '' + reason + '', false)
            .setImage('https://c.tenor.com/1dtHuFICZF4AAAAC/kill-smack.gif')
            .setColor(embedColor);
        client.channels.cache.get(channelid).send(cmdHelpEmbed);

        message.guild.member(user).kick(reason);

    },
};