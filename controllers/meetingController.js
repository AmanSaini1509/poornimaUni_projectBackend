const Meeting = require('../models/meeting');

// Create a meeting
exports.createMeeting = async (req, res) => {
  const { title, agenda, date, status, fileUrl, notifiedUsers } = req.body;

  try {
    const newMeeting = new Meeting({ title, agenda, date, status, fileUrl, notifiedUsers });
    await newMeeting.save();

    res.status(201).json({ message: 'Meeting created successfully', data: newMeeting });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create meeting', error: err.message });
  }
};

// Get all meetings with optional status filtering
exports.getAllMeetings = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query; // Optional filtering and pagination

  try {
    // Validate status if provided
    const validStatuses = ['Pending', 'Postponed', 'Completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Apply case-insensitive filter for status
    const filter = status ? { status: { $regex: new RegExp(`^${status}$`, 'i') } } : {};

    // Fetch meetings with pagination and sorting
    const meetings = await Meeting.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: 1 })
      .populate('notifiedUsers');

    // Return meetings with total count
    const total = await Meeting.countDocuments(filter);
    res.status(200).json({ meetings, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve meetings', error: err.message });
  }
};

