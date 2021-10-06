const Discord = require('discord.js');
const mysqlhandler = require("../handler/mysql.js");
const { PREFIX } = require('../utils/config.json');
const setup_generell = require("../handler/setup_generell.js");

module.exports = {
    event: 'message',
    run: async (message, client) => {
        if (message.channel.type == 'dm') return;
        if (message.author.bot) return;

        mysqlhandler.con.query(`SELECT * FROM haneul_level WHERE id = '${message.guild.id}' AND userid = '${message.author.id}'`, (err, levelrow) => {
            if (!levelrow[0]) {
                let sql = "INSERT INTO `haneul_level`(`id`, `userid`) VALUES ('" + message.guild.id + "','" + message.author.id + "')";
                mysqlhandler.con.query(sql);
            } else {
                let sql;
                const currentXP = parseInt(levelrow[0].xp);
                const currentLevel = parseInt(levelrow[0].level);
                const nextLevel = currentLevel + 1;
                const neededXP = 30 * (Math.pow(2, currentLevel) - 1);
                const nextXP = currentXP + Math.floor(Math.random() * (5 - 1 + 1) + 1);
                sql = `UPDATE \`haneul_level\` SET \`xp\` = '${nextXP}' WHERE id = '${message.guild.id}' AND userid = '${message.author.id}'`;
                mysqlhandler.con.query(sql);
                if (nextXP > neededXP) {
                    let sql2 = `UPDATE \`haneul_level\` SET \`level\` = '${nextLevel}' WHERE id = '${message.guild.id}' AND userid = '${message.author.id}'`;
                    mysqlhandler.con.query(sql2);
                    message.channel.send("**Congratulations <@" + message.author.id+'>!** You ranked up! *You are now Level ' + nextLevel+"*");
                }
            }
        });
    }
}