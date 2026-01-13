const { body } = require('express-validator');

const logInValidation = [
    body('username')
        .notEmpty().withMessage("Username is required")
        .trim()
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    body('password')
        .notEmpty().withMessage("Password is required")
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

const categoryValidation = [
    body('name')
        .notEmpty().withMessage("Name is required")
        .trim()
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
];

const userAddValidation = [
    body('fullname')
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
        .trim(),
    body('username')
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .trim(),
    body('password')
        .notEmpty().withMessage("Password is required")
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('role')
        .notEmpty().withMessage("Role is required")
        .isIn(['author', 'admin']).withMessage("Role must be author or admin")

];

const userUpdateValidation = [
    body('fullname')
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long")
        .trim(),
    body('username')
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
        .trim(),
    body('password')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('role')
        .notEmpty().withMessage("Role is required")
        .isIn(['author', 'admin']).withMessage("Role must be author or admin")

];

const articleValidation = [
    body('title')
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters long")
        .trim(),
    body('content')
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 100, max: 1000 }).withMessage("Content must be between 100 and 1000 characters long")
        .trim()
];

module.exports = {
    logInValidation,
    categoryValidation,
    userAddValidation,
    userUpdateValidation,
    articleValidation
}