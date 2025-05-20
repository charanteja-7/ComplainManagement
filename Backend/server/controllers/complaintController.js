const Complaint = require('../models/Complaint');
const asyncHandler = require('express-async-handler');

// @desc    Create new complaint
// @route   POST /api/complaints
// @access  Private (Student)
const createComplaint = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  if (!title || !category || !description) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const complaint = await Complaint.create({
    title,
    category,
    description,
    student: req.user._id,
  });

  res.status(201).json(complaint);
});

// @desc    Get all complaints (admin only)
// @route   GET /api/complaints
// @access  Private/Admin
const getAllComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find().populate('student', 'name email');
  res.status(200).json(complaints);
});

// @desc    Get complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate('student', 'name email');

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  // Only allow student who created it or admin to access
  if (complaint.student._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to view this complaint');
  }

  res.status(200).json(complaint);
});

// @desc    Update complaint status or admin response (admin only)
// @route   PUT /api/complaints/:id
// @access  Private/Admin
const updateComplaint = asyncHandler(async (req, res) => {
  const { status, adminResponse } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (status) complaint.status = status;
  if (adminResponse) complaint.adminResponse = adminResponse;

  const updatedComplaint = await complaint.save();
  res.status(200).json(updatedComplaint);
});

// @desc    Delete a complaint (admin only)
// @route   DELETE /api/complaints/:id
// @access  Private/Admin
const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  await complaint.deleteOne();
  res.status(200).json({ message: 'Complaint deleted successfully' });
});

// @desc    Update complaint (student who created it)
// @route   PUT /api/complaints/:id/student
// @access  Private (Student)
const updateComplaintByStudent = asyncHandler(async (req, res) => {
  const { title, category, description } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  // Only the student who created the complaint can update it
  if (complaint.student.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this complaint');
  }

  if (title) complaint.title = title;
  if (category) complaint.category = category;
  if (description) complaint.description = description;

  const updatedComplaint = await complaint.save();
  res.status(200).json(updatedComplaint);
});

// @desc    Get complaints created by logged-in student
// @route   GET /api/complaints/my
// @access  Private (Student)
const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(complaints);
});

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  updateComplaintByStudent,
  deleteComplaint,
  getMyComplaints, 
};
