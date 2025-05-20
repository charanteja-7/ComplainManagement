const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['Infrastructure', 'Facilities', 'Academic', 'Other'] },
    description: { type: String, required: true },
    status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Resolved', 'Closed'] },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminResponse: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);

