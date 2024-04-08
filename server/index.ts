const fs = require('fs');
const pg = require('pg');
const url = require('url');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: process.env.port,
    database: process.env.database,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.ssl,
    },
};


const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err) throw err;

     //   console.log(result.rows[0].version);
        console.log('Connection to DB was successfull!')
        
    });
});


module.exports = client;