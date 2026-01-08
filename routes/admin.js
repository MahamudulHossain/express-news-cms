const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const categoryController = require('../controllers/categoryController')
const commentController = require('../controllers/commentController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isAdmin = require('../middlewares/isAdmin')

// Login
router.get('/', userController.login);
router.post('/login', userController.adminLogin);

router.use(isLoggedIn);
router.get('/dashboard', userController.dashboard);
router.get('/logout', userController.logout);

// User CRUD
router.get('/user', isAdmin,userController.userIndex);
router.get('/user/create', isAdmin,userController.userCreate);
router.post('/user/store', isAdmin,userController.userStore);
router.get('/user/edit/:id', isAdmin,userController.userEdit);
router.post('/user/update/:id', isAdmin,userController.userUpdate);
router.delete('/user/delete/:id', isAdmin,userController.userDelete);

// News CRUD
router.get('/news', newsController.newsIndex);
router.get('/news/create', newsController.newsCreate);
router.post('/news/store', newsController.newsStore);
router.get('/news/edit/:id', newsController.newsEdit);
router.post('/news/update', newsController.newsUpdate);
router.get('/news/delete/:id', newsController.newsDelete);

// Category CRUD
router.get('/category', isAdmin,categoryController.categoryIndex);
router.get('/category/create', isAdmin,categoryController.categoryCreate);
router.post('/category/store', isAdmin,categoryController.categoryStore);
router.get('/category/edit/:id', isAdmin,categoryController.categoryEdit);
router.post('/category/update', isAdmin,categoryController.categoryUpdate);
router.get('/category/delete/:id', isAdmin,categoryController.categoryDelete);

// Comment
router.get('/comments', commentController.commentIndex);
router.post('/comments/update', commentController.commentUpdate);

// Settings
router.get('/settings/update', isAdmin,userController.settingsUpdate);

module.exports = router