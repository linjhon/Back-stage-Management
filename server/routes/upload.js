var express = require('express');
var router = express.Router();
var Upload = require('../controllers/UploadCtrl');

/* GET Uploads listing. */
router.post('/ablums',Upload.upload);
router.get('/ablums',Upload.findAll);
router.delete('/ablums/:id',Upload.delete);
// router.get('/ablums/:src',Upload.image);



module.exports = router;