const express = require('express');
const { body, validationResult } = require('express-validator');
const workspaceController = require('../controllers/workspaceController');

const router = express.Router();

const validateWorkspaceCreate = [
  body('name').trim().notEmpty().withMessage('Name is required').isString().withMessage('Name must be a string'),
  body('type').isIn(['desk', 'meeting_room', 'private_office']).withMessage('Invalid workspace type'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('price_per_hour').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/', validateWorkspaceCreate, workspaceController.createWorkspace);
router.get('/', workspaceController.getWorkspaces);

module.exports = router;
