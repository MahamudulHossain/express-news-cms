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
router.post('/news/:id/comment', siteController.addComment);

// Basic Error Page
router.use((req, res, next) => {
    res.status(404).render('404')
    next();
})

// Other Errors
router.use((err, req, res, next) => {
    res.render('common-error', {error: err});
    next();
})

module.exports = router