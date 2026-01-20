const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const categoryController = require('../controllers/categoryController')
const commentController = require('../controllers/commentController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/imageUpload')
const isValid = require('../middlewares/validation')

// Login
router.get('/', userController.login);
router.post('/login', isValid.logInValidation,userController.adminLogin);

router.use(isLoggedIn);
router.get('/dashboard', userController.dashboard);
router.get('/logout', userController.logout);

// User CRUD
router.get('/user', isAdmin,userController.userIndex);
router.get('/user/create', isAdmin,userController.userCreate);
router.post('/user/store', isAdmin,isValid.userAddValidation,userController.userStore);
router.get('/user/edit/:id', isAdmin,userController.userEdit);
router.post('/user/update/:id', isAdmin,isValid.userUpdateValidation,userController.userUpdate);
router.delete('/user/delete/:id', isAdmin,userController.userDelete);

// News CRUD
router.get('/news', newsController.newsIndex);
router.get('/news/create', newsController.newsCreate);
router.post('/news/store', upload.single('image'),isValid.articleValidation,newsController.newsStore);
router.get('/news/edit/:id', newsController.newsEdit);
router.post('/news/update/:id', upload.single('image'),isValid.articleValidation,newsController.newsUpdate);
router.delete('/news/delete/:id', newsController.newsDelete);

// Category CRUD
router.get('/category', isAdmin,categoryController.categoryIndex);
router.get('/category/create', isAdmin,categoryController.categoryCreate);
router.post('/category/store', isAdmin,isValid.categoryValidation,categoryController.categoryStore);
router.get('/category/edit/:id', isAdmin,categoryController.categoryEdit);
router.post('/category/update/:id', isAdmin,isValid.categoryValidation,categoryController.categoryUpdate);
router.delete('/category/delete/:id', isAdmin,categoryController.categoryDelete);

// Comment
router.get('/comments', commentController.commentIndex);
router.put('/comments/update/:id', commentController.commentUpdate);
router.delete('/comments/delete/:id', commentController.commentDelete);

// Settings
router.get('/settings/update', isAdmin,userController.settingsEdit);
router.post('/settings/update', isAdmin,upload.single('website_logo'),userController.settingsUpdate);

// Basic Error Page
router.use((req, res, next) => {
    res.status(404).render('admin/404')
    next();
})

// Other Errors
router.use((err, req, res, next) => {
    res.render('admin/common-error', {error: err});
    next();
})


module.exports = router