const Form = require('../models/form');

// Submit a form
exports.submitForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newForm = new Form({ name, email, subject, message });
    await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully', data: newForm });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit form', error: err.message });
  }
};

// Get all submitted forms
exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve forms', error: err.message });
  }
};
