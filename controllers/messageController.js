const Message = require('../models/message');

// Create a message
exports.createMessage = async (req, res) => {
  const { message, sentBy, sentTo } = req.body;

  try {
    const newMessage = new Message({ message, sentBy, sentTo });
    await newMessage.save();

    res.status(201).json({ message: 'Message created successfully', data: newMessage });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create message', error: err.message });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  const { sentTo } = req.query;

  try {
    const filter = sentTo ? { sentTo: sentTo } : {};
    const messages = await Message.find(filter)
      .populate('sentBy', 'name') // Populate sender details if needed
      .populate('sentTo', 'name'); // Populate recipient details if needed

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve messages', error: err.message });
  }
};



