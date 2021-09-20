const Discord = require("discord.js");
const mysql = require("mysql");
const config = require("../utils/config.json");

var con = mysql.createConnection({
    host: 'soulparadise.net',
    user: 'aichan',
    password: 'test123',
    database: 'aichan',
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