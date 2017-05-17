var express = require('express');
var router = express.Router();
var user = require('../controllers/UserCtrl');

/* GET users listing. */
router.post('/',user.create);

router.post('/data',user.findAll);

module.exports = router;
