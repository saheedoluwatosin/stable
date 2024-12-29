// Description: This file is the entry point for the application. It is responsible for starting the server and connecting to the database.
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const router = require("./router/route");
const createTables = require("./model/table");
const sendRevenueEmail = require("./utils/mailsender");
const dotenv = require("dotenv").config()
const app = express();
const cron = require('node-cron');

app.use(express.json());
app.use(cors());
app.use('/api/v1',router)


pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Database connected successfully');
    release();
});

createTables();
cron.schedule('0 18 * * *', async () => {
    console.log('Running daily revenue email cron job...');
    await sendRevenueEmail();  // Call the function to send the email
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`server has started ${PORT}`);
});