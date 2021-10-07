const Discord = require('discord.js');
const discanvas = require('discanvas');
const mysqlhandler = require("../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, CONSOLEPREFIX } = require('../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	event: 'guildMemberRemove',
	run: async (member, client) => {
       
        mysqlhandler.con.query(`SELECT * FROM haneul_quit WHERE id = '${member.guild.id}'`, (err, rows) => {
            if (err) throw err;
    
            let sql;
    
            if (rows.length < 1) {
    
            } else {
                let quittoggle = rows[0].quit_toggle;
                let quitChannel = rows[0].quit_channel;
                let quitMessage = rows[0].quit_message;
    
                if (quittoggle === '0') {
    
                } else {
                    sendQuit(member, client, quittoggle, quitChannel, quitMessage);
                }
            }
        });
	},
};

async function sendQuit(member, client, welcometoggle, welcomeChannel, welcomeMessage) {
    if (welcometoggle === '1') {
        
        if(welcomeMessage) {
            var replaced1 = welcomeMessage.replace('{USER}', member.user.tag);
            var replaced2 = replaced1.replace('{SERVER}', member.guild.name);
            welcomeChannel.send(replaced2);
        }

        if (!setchannel) {
            return
        }

        setchannel.send(``, attachment);
    }
}
