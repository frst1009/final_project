const { body } = require('express-validator');

const loginValidation = [
	body('email', 'Invalid mail format').isEmail(),
	body('password', 'Password must contain at least 5 characters').isLength({ min: 5 }),
];

const registerValidation = [
	body('email', 'Invalid mail format').isEmail(),
	body('password', 'Password must contain at least 5 characters!').isLength({ min: 5 }),
	body('username', 'Name should contain at least 2 characters!').isLength({ min: 2 }),
	body('profilepicture', 'Invalid image link').optional().isURL(),
];

const postCreateValidation = [
	body('title', 'Enter a title').isLength({ min: 2 }).optional().isString(),
	body('image', 'Invalid image link').optional().isString(),
];

module.exports = {
    loginValidation,
    registerValidation,
    postCreateValidation,
  };