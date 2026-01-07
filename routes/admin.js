import express from "express"
const router = express.Router()

const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const categoryController = require('../controllers/categoryController')
const commentController = require('../controllers/commentController')

// Login
router.get('/', userController.login());
router.post('/index', userController.adminLogin());
router.get('/logout', userController.logout());

// User CRUD
router.get('/user', userController.userIndex());
router.get('/user/create', userController.userCreate());
router.post('/user/store', userController.userStore());
router.get('/user/edit/:id', userController.userEdit());
router.post('/user/update', userController.userUpdate());
router.get('/user/delete/:id', userController.userDelete());

// News CRUD
router.get('/news', newsController.newsIndex());
router.get('/news/create', newsController.newsCreate());
router.post('/news/store', newsController.newsStore());
router.get('/news/edit/:id', newsController.newsEdit());
router.post('/news/update', newsController.newsUpdate());
router.get('/news/delete/:id', newsController.newsDelete());

// Category CRUD
router.get('/category', categoryController.categoryIndex());
router.get('/category/create', categoryController.categoryCreate());
router.post('/category/store', categoryController.categoryStore());
router.get('/category/edit/:id', categoryController.categoryEdit());
router.post('/category/update', categoryController.categoryUpdate());
router.get('/category/delete/:id', categoryController.categoryDelete());

// Comment
router.get('/comment', commentController.commentIndex());
router.post('/comment/update', commentController.commentUpdate());


export default router