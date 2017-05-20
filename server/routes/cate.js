var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/CateCtrl');

/* GET ctrls listing. */
router.post('/',ctrl.create);
router.get('/data',ctrl.findAll);
router.get('/data/:type',ctrl.findAll);
router.put('/:id',ctrl.update);
router.delete('/:id',ctrl.delete);
// router.post('/deletemore',ctrl.deleteMore);


module.exports = router;