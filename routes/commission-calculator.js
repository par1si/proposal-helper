const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('commission-calculator')
})

module.exports = router;