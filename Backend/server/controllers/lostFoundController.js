const LostFound = require('../models/LostFound');
const asyncHandler = require('express-async-handler');

// @desc    Report a lost/found item
// @route   POST /api/lost-found
// @access  Private
const reportItem = asyncHandler(async (req, res) => {
  const { itemName, description, location, status } = req.body;

  if (!itemName || !description || !location) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const item = await LostFound.create({
    itemName,
    description,
    location,
    status: status || 'Lost',
    reporter: req.user._id,
  });

  res.status(201).json(item);
});

// @desc    Get all reported items
// @route   GET /api/lost-found
// @access  Private
const getAllItems = asyncHandler(async (req, res) => {
  const items = await LostFound.find()
    .populate('reporter', 'name email')
    .populate('finder', 'name email')
    .populate('matchedWith');

  res.status(200).json(items);
});

// @desc    Get item by ID
// @route   GET /api/lost-found/:id
// @access  Private
const getItemById = asyncHandler(async (req, res) => {
  const item = await LostFound.findById(req.params.id)
    .populate('reporter', 'name email')
    .populate('finder', 'name email')
    .populate('matchedWith');

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.status(200).json(item);
});

// @desc    Update item
// @route   PUT /api/lost-found/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const { itemName, description, location, status, finder, matchedWith } = req.body;

  const item = await LostFound.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  if (itemName !== undefined) item.itemName = itemName;
  if (description !== undefined) item.description = description;
  if (location !== undefined) item.location = location;
  if (status !== undefined) item.status = status;
  if (finder !== undefined) item.finder = finder;
  if (matchedWith !== undefined) item.matchedWith = matchedWith;

  const updatedItem = await item.save();
  res.status(200).json(updatedItem);
});


// @desc    Delete item (admin only)
// @route   DELETE /api/lost-found/:id
// @access  Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await LostFound.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  await item.deleteOne();
  res.status(200).json({ message: 'Item deleted successfully' });
});

// @desc    Get all items reported by the logged-in user
// @route   GET /api/lost-found/my
// @access  Private
const getMyItems = asyncHandler(async (req, res) => {
  const items = await LostFound.find({ reporter: req.user._id })
    .populate('reporter', 'name email')
    .populate('finder', 'name email')
    .populate('matchedWith');

  res.status(200).json(items);
});

module.exports = {
  reportItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getMyItems,
};
