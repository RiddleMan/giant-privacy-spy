const express = require('express');
const router = express.Router();

router.get('/dupa', function(req, res) {
    res.send({
        status: 200,
        orajt: 'asdf'
    });
});

module.exports = router;
