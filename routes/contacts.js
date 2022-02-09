//create express server
const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/',(req,res) => {
    res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/',(req,res) => {
    res.send('Add new contact');
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.get('/:id',(req,res) => { //:id is a placeholder for the contact to update
    res.send('Update contact');
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.get('/:id',(req,res) => {
    res.send('Delete contact');
});

module.exports = router;