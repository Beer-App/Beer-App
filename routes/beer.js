const express = require('express');
const router  = express.Router();
const User = require('../mdoels/Users')
/* GET home page. */
router.get('/add', (req, res, next) => {
  res.render('index');
});


module.exports = router;
