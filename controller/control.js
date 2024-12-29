const pool = require("../db");




const invoice = async (req, res) => {

const { customer_name,service,quantity,amount, paymentType } = req.body;

    try {
        const revenueResult = await pool.query(
            `INSERT INTO revenue (customer_name,service,quantity, amount, payment_type) 
             VALUES ($1, $2, $3,$4,$5) RETURNING id,total`,
            [customer_name,service,quantity,amount, paymentType]
        );

        const revenueId = revenueResult.rows[0].id;

        if (paymentType === 'cash') {
            await pool.query(
                `INSERT INTO bank (revenue_id,customer_name,service,quantity, amount) VALUES ($1, $2,$3,$4,$5)`,
                [revenueId,customer_name,service,quantity, amount]
            );
        } else if (paymentType === 'credit') {
            await pool.query(
                `INSERT INTO receivable (revenue_id,customer_name,service,quantity, amount) VALUES ($1, $2,$3,$4,$5)`,
                [revenueId, customer_name,service,quantity,amount]
            );
        }

        res.status(201).json({
            status: 'success',
            message: 'Invoice processed successfully',
            data: {
                customer_name,
                service,
                quantity,
                amount,
                paymentType
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing invoice.');
    }
}


module.exports = invoice;