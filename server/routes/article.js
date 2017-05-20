var express = require('express');
var router = express.Router();
var Article = require('../controllers/ArticleCtrl');

/* GET Articles listing. */
router.post('/',Article.create);
router.post('/login',Article.login);
router.post('/token',Article.token);
router.post('/data',Article.getData);
router.put('/:id',Article.update);
router.delete('/:id',Article.delete);
router.post('/deletemore',Article.deleteMore);



module.exports = router;
