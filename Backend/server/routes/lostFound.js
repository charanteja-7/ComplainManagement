const express = require('express');
const router = express.Router();
const { reportItem, getAllItems, getItemById, updateItem, deleteItem,getMyItems } = require('../controllers/lostFoundController');
const { protect, admin } = require('../middleware/authMiddleware');

//get My Items (Student Only)
router.get('/my', protect, getMyItems);

// Report Lost/Found Item
router.post('/', protect, reportItem);

// Get All Items
router.get('/', protect, getAllItems);

// Get Item Details
router.get('/:id', protect, getItemById);

// Update Item Status
router.put('/:id', protect, updateItem);

// Delete Item (Admin Only)
router.delete('/:id', protect,deleteItem);

module.exports = router;

