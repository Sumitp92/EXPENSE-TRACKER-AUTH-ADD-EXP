const express = require('express');
const router = express.Router();
const { AddUser , LoginUser , getExp, addExp, delExp, editExp } = require('../controllers/Auth'); // Adjust the path as necessary

// User routes
router.post('/signup', AddUser );
router.post('/login', LoginUser );

// Expense routes
router.get('/expenses', getExp);
router.post('/expenses', addExp);
router.delete('/expenses/:id', delExp);
router.put('/expenses/:id', editExp);

module.exports = router;
