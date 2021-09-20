const Discord = require('discord.js');
// const mysqlhandler = require("../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, CONSOLEPREFIX } = require('../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	event: 'message',
	run: async (message, client) => {

        // if (message.channel.type === 'text') {
        //     mysqlhandler.con.query(`SELECT * FROM mute WHERE id = '${message.guild.id}' AND userid = '${message.author.id}'`, (err, rows) => {
        //         if (err) throw err;
    
        //         let sql;
    
        //         if (rows.length < 1) {
    
        //         } else {
        //             message.delete();
        //         }
        //     });
        // }

	},
};
