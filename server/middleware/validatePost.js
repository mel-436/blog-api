import { body } from 'express-validator';
import { validationResult } from 'express-validator';

const validatePost = [
    body('title').notEmpty().trim().withMessage('Title is required'),
    body('content').notEmpty().trim().withMessage('Content is required'), 
    body('author').notEmpty().trim().withMessage('Author is required'),
]

function checkValidation(req, res, next)  {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };

export { validatePost, checkValidation };