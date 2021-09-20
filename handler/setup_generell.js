const Discord = require("discord.js");
const config = require("../utils/config.json");
const mysqlhandler = require("../handler/mysql.js");

function set(guildid) {

    mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${guildid}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
            sql = `INSERT INTO botsettings (id) VALUES ('${guildid}')`;
            mysqlhandler.con.query(sql);
        }
    });

}

function deleteguild(guildid) {

    mysqlhandler.con.query(`SELECT * FROM botsettings WHERE id = '${guildid}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length > 0) {
            sql = `DELETE FROM botsettings WHERE id='${guildid}'`;
            mysqlhandler.con.query(sql);
        }
    });

}

module.exports =
{
    set,
    deleteguild
}