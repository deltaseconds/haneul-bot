const Discord = require("discord.js");
const main = require("./../../index.js");
const { PREFIX, COLORS, VERSION, IMAGE_INFOEMBED } = require('../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'filter',
	description: 'Set a Filter',
	aliases: [],
	usage: '[filtername]',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;
		const name = args[0];

        let role = message.guild.roles.cache.find(role => role.name == 'DJ')
        if (!role) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('AI-Chan (' + VERSION + ') - Musicbot', IMAGE_INFOEMBED)
            .addField('**__NOTE__**', 'You must create a role with the name **DJ**.', false)
            .setColor(embedError);
            client.channels.cache.get(message.channel.id).send(cmdHelpEmbed); 
            return
        }

        if (!message.member.roles.cache.find(role => role.name === "DJ")) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('AI-Chan (' + VERSION + ') - Musicbot', IMAGE_INFOEMBED)
            .addField('**__NOTE__**', 'You need the **DJ role** to use the Musicbot.', false)
            .setColor(embedError);
            client.channels.cache.get(message.channel.id).send(cmdHelpEmbed); 
            return
        }

        if (!message.member.voice.channel) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('AI-Chan (' + VERSION + ') - Musicbot', IMAGE_INFOEMBED)
            .addField('**__NOTE__**', 'You must be in a voice channel!', false)
            .setColor(embedError);
            client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
            return
        }

        if (!args.length) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
            .setAuthor('AI-Chan (' + VERSION + ') - Musicbot', IMAGE_INFOEMBED)
            .addField('Error', 'Use `' + PREFIX + 'filter' + ' <3d, bassboost, nightcore, vaporwave>` to set a filter', false)
            .setColor(embedError);
            client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}

        if (name === '3d' || name === 'bassboost' || name === 'nightcore' || name === 'vaporwave') {
            main.music('filter', message, args);
        }

	},
};