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
router.put('/:id', auth, async(req,res) => { //:id is a placeholder for the contact to update
    const{name, email, phone, type} = req.body;

    //build contact object to check fields that are included
    const contactFields={};
    if(name) contactFields.name= name;
    if(email) contactFields.email= email;
    if(phone) contactFields.phone= phone;
    if(type) contactFields.type= type;

    try {
        //find contact by accessign /:id param
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg: 'Contact not found'});
        
        //Verify user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }

        //finds contact by id 
        contact = await Contact.findByIdAndUpdate(req.params.id,
            //if it exists, update from contactFields
            {$set: contactFields},
            //if not creates new contact
            {new: true}
        );
        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req,res) => {
    try {
        //find contact by accessign /:id param
        let contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({msg: 'Contact not found'});
        
        //Verify user owns contact
        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not authorized'});
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;