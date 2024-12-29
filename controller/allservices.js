const pool = require("../db");

const revenuetable = async (req,res)=>{
    try {
        const revenueResult = await pool.query('SELECT * FROM revenue');
        res.status(200).json({
            status: 'success',
            data: revenueResult.rows
        });

    } catch (error) {
      res.status(500).send('Error fetching data');  
    }
}
const receivabletable =async (req,res)=>{
    try {
        const receivableResult = await pool.query('SELECT * FROM receivable');
        res.status(200).json({
            status: 'success',
            data: receivableResult.rows
        });

    } catch (error) {
      res.status(500).send('Error fetching data');  
    }
}


const banktable =async (req,res)=>{
    try {
        const bankResult = await pool.query('SELECT * FROM bank');
        res.status(200).json({
            status: 'success',
            data: bankResult.rows
        });

    } catch (error) {
      res.status(500).send('Error fetching data');  
    }
}

module.exports={revenuetable,receivabletable,banktable};



