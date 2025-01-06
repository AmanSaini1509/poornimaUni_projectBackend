const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  title: String,
  agenda: String,
  date: Date,
  status: {
    type: String,
    enum: ['pending', 'postponed', 'completed'],
    default: 'pending',
  },
  fileUrl: String,
  notifiedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authentication', // Store reference to users who have been notified about the meeting
    },
  ],
});

module.exports = mongoose.model('Meeting', meetingSchema);
