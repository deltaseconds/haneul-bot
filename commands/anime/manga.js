const Discord = require('discord.js');
const { get } = require("request-promise-native");
const mysqlhandler = require("../../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, IMAGE_INFOEMBED } = require('../../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
    name: 'manga',
    description: 'Search a Manga',
    aliases: [],
    usage: '<manga>',
    guildOnly: true,
    args: false,
    execute: async (message, args, client) => {
        const { commands } = message.client;
        let channelid = message.channel.id;

        if (!args.length) {
            const cmdHelpEmbed = new Discord.MessageEmbed()
                .setAuthor('AI-Chan (' + VERSION + ') - Information', IMAGE_INFOEMBED)
                .addField('Error', 'Use `' + PREFIX + 'manga' + ' <manga>` to search a Manga', false)
                .setColor(embedError);
            client.channels.cache.get(channelid).send(cmdHelpEmbed);
            return
        }

        let reason = args.slice(0).join(" ");
        
        let option = {
            url: `https://kitsu.io/api/edge/manga?filter[text]=${reason}`,
            method: `GET`,
            headers: {
                'Content-Type': "application/vnd.api+json",
                'Accept': "application/vnd.api+json"

            },
            json: true
        }

        client.channels.cache.get(channelid).send("Fetching The Info").then(msg => {
            get(option).then(body => {
                try {

                    let title = body.data[0].attributes.titles.en
                    if (!title) { title = 'Title not found or incorrect' }

                    let subtitle = body.data[0].attributes.titles.ja_jp
                    if (!subtitle) { subtitle = 'Title not found or incorrect' }

                    let airedstart = body.data[0].attributes.startDate
                    if (!airedstart) { airedstart = '-' }

                    let airedend = body.data[0].attributes.endDate
                    if (!airedend) { airedend = '-' }

                    let episodes = body.data[0].attributes.episodeCount
                    if (!episodes) { episodes = 'Episodes not found' }

                    let ratings = body.data[0].attributes.averageRating
                    if (!ratings) { ratings = 'Rating not found' }

                    let agerating = body.data[0].attributes.ageRating
                    if (!agerating) { agerating = 'Agerating not found' }

                    let status = body.data[0].attributes.status
                    if (!status) { status = 'Status not found' }

                    let type = body.data[0].attributes.subtype
                    if (!type) { type = 'Type not found' }

                    let embed = new Discord.MessageEmbed()
                        .setTitle(title)
                        .setColor(embedColor)
                        .setDescription('***' + subtitle + '***\n\n' + body.data[0].attributes.synopsis)
                        .setThumbnail(body.data[0].attributes.posterImage.original)
                        .addField("Aired", airedstart + ' to ' + airedend, true)
                        .addField("Ratings", ratings, true)
                        .addField("EPISODES", episodes, true)
                        .addField("Age rating", agerating, true)
                        .addField("Status", status, true)
                        .addField("Type", type, true)
                        .setImage(body.data[0].attributes.coverImage.large)
                    message.channel.send(embed)
                    msg.delete();

                } catch (err) {
                    msg.delete();
                    return message.channel.send("Unable to find this manga");
                }
            })
        })
    },
};