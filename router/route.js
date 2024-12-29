const express = require('express');
const invoice = require('../controller/control');
const { revenuetable, receivabletable, banktable } = require('../controller/allservices');

const router = express.Router();


router.post('/invoice', invoice);
router.get('/revenue', revenuetable);
router.get('/recievable', receivabletable);
router.get('/bank', banktable);







module.exports = router;