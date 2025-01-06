const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  authToken: { type: String, default: null },
  role: { type: String, enum: ['admin', 'superUser', 'user'], default: 'user' },
  isActive: { type: Boolean, default: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  meetings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' }]
});

module.exports = mongoose.model('Authentication', AuthenticationSchema);
