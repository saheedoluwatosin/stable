const { Pool } = require("pg");
const dotenv = require("dotenv").config()




const pool = new Pool({
    user: 'avnadmin',
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port4,
    ssl: {
        rejectUnauthorized: false,
    },
});


module.exports= pool
