const Discord = require("discord.js");
const config = require("../utils/config.json");
const mysqlhandler = require("../handler/mysql.js");

function set(from, guildid) {

    mysqlhandler.con.query(`SELECT * FROM ${from} WHERE id = '${guildid}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
            sql = `INSERT INTO ${from} (id) VALUES ('${guildid}')`;
            mysqlhandler.con.query(sql);
        }
    });

}

function deleteguild(from, guildid) {

    mysqlhandler.con.query(`SELECT * FROM ${from} WHERE id = '${guildid}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length > 0) {
            sql = `DELETE FROM ${from} WHERE id='${guildid}'`;
            mysqlhandler.con.query(sql);
        }
    });

}
function generalSetup(guildid) {
    set("haneul_xp", guildid);
    set("haneul_quit", guildid);
    set("haneul_welcome", guildid);
}

function generalDel(guildid) {
    deleteguild("haneul_xp", guildid);
    deleteguild("haneul_quit", guildid);
    deleteguild("haneul_welcome", guildid);
}


module.exports =
{
    set,
    deleteguild,
    generalDel,
    generalSetup
}