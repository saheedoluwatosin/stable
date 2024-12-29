const pool = require("../db");


const createTables = async () => {
    const createRevenueTable = `
        CREATE TABLE IF NOT EXISTS revenue (
            id SERIAL PRIMARY KEY,
            invoice_id SERIAL UNIQUE,
            customer_name VARCHAR(50),
            service VARCHAR(50),
            quantity INT,
            amount NUMERIC(10, 2),
            total NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * amount) STORED,
            payment_type VARCHAR(10), -- 'cash' or 'credit'
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createBankTable = `
        CREATE TABLE IF NOT EXISTS bank (
            id SERIAL PRIMARY KEY,
            revenue_id INT REFERENCES revenue(id),
            customer_name VARCHAR(50),
            service VARCHAR(50),
            quantity INT,
            amount NUMERIC(10, 2),
            total NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * amount) STORED,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createReceivableTable = `
        CREATE TABLE IF NOT EXISTS receivable (
            id SERIAL PRIMARY KEY,
            revenue_id INT REFERENCES revenue(id),
            customer_name VARCHAR(50),
            service VARCHAR(50),
            quantity INT,
            amount NUMERIC(10, 2),
            total NUMERIC(10, 2) GENERATED ALWAYS AS (quantity * amount) STORED,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        await pool.query(createRevenueTable);
        await pool.query(createBankTable);
        await pool.query(createReceivableTable);
        console.log("Tables created successfully");
    } catch (err) {
        console.error("Error creating tables", err);
    } 
};








module.exports= createTables;