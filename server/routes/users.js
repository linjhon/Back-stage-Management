var express = require('express');
var router = express.Router();
var user = require('../controllers/UserCtrl');

/* GET users listing. */
router.post('/',user.create);
router.post('/data',user.getData);
router.put('/:id',user.update);
router.delete('/:id',user.delete);
router.post('/deletemore',user.deleteMore);


module.exports = router;
