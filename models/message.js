const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authentication', // Reference the Authentication model for sender
    required: true,
  },
  sentTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Authentication', //Reference the Authentication model for recipients
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);