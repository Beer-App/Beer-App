const express = require('express');
const router  = express.Router();

const loginCheck = () => {
    return (req, res,next) => {
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            next();
        }
    }
}

module.exports = {
    loginCheck:loginCheck
}