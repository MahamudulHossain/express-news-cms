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

module.exports = {
    logInValidation,
    categoryValidation
}