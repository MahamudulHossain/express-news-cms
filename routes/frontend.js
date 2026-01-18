const express = require('express')
const router = express.Router()

const siteController = require('../controllers/siteController')
const frontendCommon = require('../middlewares/frontendCommon')

router.use(frontendCommon);

router.get('/', siteController.index);
router.get('/author/:id', siteController.newsByAuthor);
router.get('/category/:slug', siteController.newsByCategory);
router.get('/single/:id', siteController.singleNews);
router.get('/search', siteController.searchNews);
router.post('/single/:id', siteController.addComment);

module.exports = router