const express = require('express')
const router = express.Router()

const siteController = require('../controllers/siteController')

router.get('/', siteController.index);
router.get('/author/:id', siteController.newsByAuthor);
router.get('/category/:name', siteController.newsByCategory);
router.get('/single/:id', siteController.singleNews);
router.get('/search/:id', siteController.searchNews);
router.post('/single/:id', siteController.addComment);

module.exports = router