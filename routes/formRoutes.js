const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/forms', formController.submitForm);
router.get('/forms', formController.getAllForms);

module.exports = router;
