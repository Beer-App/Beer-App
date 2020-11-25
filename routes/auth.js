const express = require('express');
const router  = express.Router();
const User = require('../mdoels/Users')
const bcrypt =  require('bcrypt')
const passport = require('passport');
const {loginCheck} = require('./middlewares');
const Cart = require('../mdoels/Cart')

router.get('/login',loginCheck(), (req,res) => {
    res.render('auth/login')
})
router.get('/signup',loginCheck(), (req,res) => {
    res.render('auth/signup')
})

router.post('/signup', (req,res,next) => {
    const {username, password} = req.body
    if (password.length < 1) {
        res.render('auth/signup', {
          message: 'Your password must be 8 characters minimun.'
        });
        return;
      }
      if (username === '') {
        res.render('auth/signup', { message: 'Your username cannot be empty' });
        return;
      }
      User.findOne({ username: username }).then(found => {
        if (found !== null) {
          res.render('auth/signup', { message: 'This username is already taken' });
        } else {
          // we can create a user with the username and password pair
          const salt = bcrypt.genSaltSync();
          const hash = bcrypt.hashSync(password, salt);
    
          User.create({ username: username, password: hash })
            .then(dbUser => {
              // login with passport 
              req.login(dbUser, err => {
                if (err) {
                  next(err);
                } else {
                  res.redirect('/');
                }
              })
            })
            .catch(err => {
              next(err);
            });
        }
      });
})

router.post(
    '/login',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      passReqToCallback: true
    })
  );
  
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

module.exports = router