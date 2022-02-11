//create express server
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs/dist/bcrypt');
const {validationResult, check } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

//user model from schema
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/',(req,res) => {
    res.send('Get logged in user');
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Private
router.post('/',[
    //set checks for user data validation
    check('email','Enter a valid email').isEmail(),
    check('password','Password is required').exists()

], async (req,res) => {

    const errors = validationResult(req);
    //if there is an error
    if(!errors.isEmpty()){
        //400 bad request and array of errors
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});
        //if uyser does not exist
        if(!user){
            return res.status(400).json({msg: 'invalid Credentials'});
        }

        //checks if passwords match 
        const isMatch = await bcrypt.compare(password,user.password);

        //if password does not match
        if(!isMatch){
            return res.status(400).json({msg: 'invalid Credentials'});
        }

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
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;