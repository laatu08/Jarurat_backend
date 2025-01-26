const { check, validationResult } = require('express-validator');

// Validation Middleware
const resourceValidation = [
    check('name').notEmpty().withMessage('Name is required').isLength({ max: 255 }).withMessage('Name cannot exceed 255 characters'),
    check('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters')
];

module.exports=resourceValidation;