const Discord = require('discord.js');
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('./../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	name: 'clear',
	description: 'Clear the chat. You can delete up to 99 messages',
	aliases: [],
	usage: '1-99',
	guildOnly: true,
	args: false,
	execute: async (message, args, client) => {
		const { commands } = message.client;

		if (!message.member.hasPermission("BAN_MEMBERS")) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.setThumbnail('https://media.discordapp.net/attachments/827195116766363651/873550975904919642/anime-no.gif')
			.addField('Error', NOPERMS, false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}

		if (!args.length) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.addField('Error', 'Use `' + PREFIX + 'clear' + ' 20` to delete 20 messages', false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}

		if (isNaN(args[0])) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.addField('Error', 'You must enter a number', false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}
		if (args[0] <= 0) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.addField('Error', 'You must enter a number', false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
			return
		}
        if (args[0] >= 100) {
			const cmdHelpEmbed = new Discord.MessageEmbed()
			.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
			.addField('Error', 'The number must be below 100', false)
			.setColor(embedError);
			client.channels.cache.get(message.channel.id).send(cmdHelpEmbed);
        } else {

			if (!message) return

            message.channel.bulkDelete(args[0], true)
			setTimeout(() => {

				const cmdHelpEmbed = new Discord.MessageEmbed()
				.setAuthor('Haneul A.I. (' + VERSION + ') - Information', IMAGE_INFOEMBED)
				.addField('Successfully', 'Deleted **' + args[0] + '** messages', false)
				.setColor(embedColor);
				client.channels.cache.get(message.channel.id).send(cmdHelpEmbed).then(msg => msg.delete({ timeout: "5000" }))

			}, 1000);
        }
		return
	},
};