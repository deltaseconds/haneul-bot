const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("../utils/config.json");

var con = mysql.createConnection({
    host: 'web8781.cweb04.gamingweb.de',
    user: 'kogeki',
    password: 'X34Z9JJiK31',
    database: 'discordbots',
    charset : 'utf8mb4'
});

function connect() {

    con.connect(err => {
        if(err) throw err;
        console.log(config.CONSOLEPREFIX + "Connection to MySQL has been established!");
    });

    connection = con

}

module.exports =
{
    connect,
    con
}