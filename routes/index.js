const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render(process.cwd() + '/views/proposal-helper.ejs')
});

module.exports = router;