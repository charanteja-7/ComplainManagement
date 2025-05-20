const express = require('express');
const router = express.Router();
const { createComplaint, getAllComplaints, getComplaintById, updateComplaint, deleteComplaint,updateComplaintByStudent, getMyComplaints } = require('../controllers/complaintController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get My Complaints (Student Only)
router.get('/my', protect, getMyComplaints);

// Create Complaint
router.post('/', protect, createComplaint);

// Get All Complaints (Admin Only)
router.get('/', protect, admin, getAllComplaints);

// Get Complaint by ID
router.get('/:id', protect, getComplaintById);

// Update Complaint (Admin Only)
router.put('/:id', protect, admin, updateComplaint);

// Delete Complaint (Admin Only)
router.delete('/:id', protect, admin, deleteComplaint);

// For student updating their own complaint
router.put('/:id/student', protect, updateComplaintByStudent);



module.exports = router;

