//create express server
const express = require('express');
const router = express.Router();
const {validationResult, check } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

//middleware to protect request
const auth = require('../middleware/auth');

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/',auth, async (req,res) => {
    try {
        //finds contacts using the user id  from the auth middleware
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/',[auth,[
    //[auth, [checks]] allows to use multiple middlewares 
    check('name','Name is required').not().isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);

    //if there is an error
    if(!errors.isEmpty()){
        //400 bad request and array of errors
        return res.status(400).json({errors: errors.array()});
    }

    const{name, email, phone, type} = req.body;

    try {
        //Create new contact from schema
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        //saves contact to database
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
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