import express from "express"
const router = express.Router()

const siteController = require('../controllers/site.controller')

router.get('/', siteController.index());
router.get('/author/:id', siteController.newsAuthor());
router.get('/category/:name', siteController.newsCategory());
router.get('/single/:id', siteController.singleNews());
router.get('/search/:id', siteController.searchNews());
router.post('/single/:id', siteController.addComment());

export default router