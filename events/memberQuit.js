const Discord = require('discord.js');
const discanvas = require('discanvas');
const mysqlhandler = require("../handler/mysql.js");
const { PREFIX, COLORS, VERSION, NOPERMS, CONSOLEPREFIX } = require('../utils/config.json');
const embedColor = COLORS.default;
const embedError = COLORS.error;

module.exports = {
	event: 'guildMemberRemove',
	run: async (member, client) => {
       
        mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${member.guild.id}'`, (err, rows) => {
            if (err) throw err;
    
            let sql;
    
            if (rows.length < 1) {
    
            } else {
                let quittoggle = rows[0].quittoggle;
                let quitChannel = rows[0].quitChannel;
                let quitMessage = rows[0].quitMessage;
                let quitImage = rows[0].quitImage;
    
                if (quittoggle === null) {
    
                } else {
                    sendQuit(member, client, quittoggle, quitChannel, quitMessage, quitImage)
                }
            }
        });
	},
};

async function sendQuit(member, client, quittoggle, quitChannel, quitMessage, quitImage) {
    if (quittoggle === 'on') {

        const leave = await new discanvas.Leave()
        .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
        .setUsername(member.user.tag)
        .setBackground("BACKGROUND", quitImage)
        .setMainText("Goodbye")
        .setSecondText(quitMessage)
        .toLeave()
    
        const attachment = new Discord.MessageAttachment(leave.toBuffer(), "leave.jpg");
        const setchannel = client.channels.cache.get(quitChannel);

        if (!setchannel) {
            return
        }

        setchannel.send(``, attachment);
    }
}
