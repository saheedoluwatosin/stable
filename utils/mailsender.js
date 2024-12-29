const nodemailer = require('nodemailer');
const pool = require('../db');
const dotenv = require('dotenv').config();



const sendRevenueEmail = async () => {
    try {
        // Query for total revenue, receivables, and bank transactions for the day
        const revenueResult = await pool.query(
            `SELECT SUM(total) AS total_revenue FROM revenue 
             WHERE DATE(created_at) = CURRENT_DATE`
        );

        const receivableResult = await pool.query(
            `SELECT SUM(total) AS total_receivable FROM receivable
             WHERE DATE(created_at) = CURRENT_DATE`
        );

        const bankResult = await pool.query(
            `SELECT SUM(total) AS total_bank FROM bank
             WHERE DATE(created_at) = CURRENT_DATE`
        );

        const totalRevenue = revenueResult.rows[0].total_revenue || 0;
        const totalReceivable = receivableResult.rows[0].total_receivable || 0;
        const totalBank = bankResult.rows[0].total_bank || 0;

        // Email HTML template with a clean and professional design
        const emailHtml = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #4CAF50;
                    }
                    .table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    .table, .table th, .table td {
                        border: 1px solid #ddd;
                    }
                    .table th, .table td {
                        padding: 10px;
                        text-align: right;
                    }
                    .table th {
                        background-color: #4CAF50;
                        color: white;
                    }
                    .total {
                        font-weight: bold;
                        color: #4CAF50;
                    }
                    .footer {
                        text-align: center;
                        font-size: 12px;
                        color: #777;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Daily Revenue Summary</h1>
                    <p>Dear Accounting Team,</p>
                    <p>Here is the revenue summary for today:</p>

                    <table class="table">
                        <tr>
                            <th>Transaction Type</th>
                            <th>Amount ($)</th>
                        </tr>
                        <tr>
                            <td>Total Revenue</td>
                            <td class="total">$${totalRevenue}</td>
                        </tr>
                        <tr>
                            <td>Total Receivables</td>
                            <td class="total">$${totalReceivable}</td>
                        </tr>
                        <tr>
                            <td>Total Bank Transactions</td>
                            <td class="total">$${totalBank}</td>
                        </tr>
                    </table>

                    <p>Best regards,</p>
                    <p>Your Revenue Tracker</p>

                    <div class="footer">
                        <p>This is an automated email. Please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Email transporter setup using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,  // Replace with your email
                pass: process.env.EMAIL_PASSWORD,         // Replace with your email password (consider using environment variables for better security)
            },
        });

        // Send the email
        await transporter.sendMail({
            from: '"Revenue Tracker" <saheedoluwatosin4@gmail.com>',
            to: 'saheedoluwatosin2@gmail.com',    // Replace with the recipient email
            subject: 'Daily Revenue Summary',
            html: emailHtml,
        });

        console.log('Revenue summary email sent.');
    } catch (err) {
        console.error('Error sending daily revenue email:', err);
    }
};

module.exports = sendRevenueEmail;


