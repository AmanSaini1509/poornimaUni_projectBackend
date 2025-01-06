const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/meetings', meetingController.createMeeting);
router.get('/meetings', meetingController.getAllMeetings);

module.exports = router;
