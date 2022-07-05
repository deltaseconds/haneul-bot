const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("../utils/config.json");

var con = mysql.createConnection({
    host: 'plesk10.zap-webspace.com',
    user: 'chizuru',
    password: 'h+A%LVNWps/d~2hy',
    database: 'chizuru',
    charset: 'utf8mb4'
});

function connect() {

    con.connect(err => {
        if (err) throw err;
        console.log(config.CONSOLEPREFIX + "Connection to MySQL has been established!");
    });

    connection = con

}

module.exports =
{
    connect,
    con
}