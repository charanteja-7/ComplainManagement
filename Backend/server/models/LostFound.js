const mongoose = require('mongoose');

const lostFoundSchema = mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'Lost', enum: ['Lost', 'Found', 'Returned'] },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    finder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    matchedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'LostFound' }, // Optional
  },
  { timestamps: true }
);

module.exports = mongoose.model('LostFound', lostFoundSchema);

