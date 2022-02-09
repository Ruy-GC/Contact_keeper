//create express server
const express = require('express');
const router = express.Router();
const {validationResult, check } = require('express-validator');

//user schema
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',[
    //set checks for user data validation
    check('name','Name is required')
        .not()
        .isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength({min:6})

],(req,res) => {
    const errors = validationResult(req);

    //if there is an error
    if(!errors.isEmpty()){
        //400 bad request and array of errors
        return res.status(400).json({errors: errors.array()});
    }
    res.send(req.body);
});

module.exports = router;