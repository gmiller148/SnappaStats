const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/user',function(req,res) {
    const newUser = new User({
        name:req.body.name,
    });
    newUser.save();
    console.log(req.body.name);
});

module.exports = router;