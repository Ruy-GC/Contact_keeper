//create express server
const bcrypt = require('bcryptjs/dist/bcrypt');
const express = require('express');
const router = express.Router();
const {validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//user model from schema
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

], async (req,res) => {
    const errors = validationResult(req);

    //if there is an error
    if(!errors.isEmpty()){
        //400 bad request and array of errors
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, email,password} = req.body;

    try {
        //only can use await with async functions}

        //searches if the user is already registered
        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({msg: "User already exists"});
        }

        //creates new user instance to hash the password
        user = new User({
            name,
            email,
            password
        });

        //we use await becausde genSalt and hash functions return a promise
        //10 is the rounds for the salt
        const salt = await bcrypt.genSalt(10); 
         //returns hashed version of the password
        user.password = await bcrypt.hash(password,salt);

        //saves user in mogoDB
        await user.save();

        //payload to send in jwt
        const payload = {
            user: {
                id:user.id
            }
        }

        //sign the jwt to ensure it hasn't been altered, sign uses payload and secret
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn: 3600
        },(err,token) => {
            //return generated jwt
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;