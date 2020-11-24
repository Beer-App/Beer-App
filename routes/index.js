const express = require('express');
const router  = express.Router();
const Beer = require('../mdoels/Beers')
/* GET home page. */
router.get('/', (req, res, next) => {
  Beer.find()
  .then(data => res.render('index', {data}))
  .catch(err => next(err))
});

module.exports = router;
