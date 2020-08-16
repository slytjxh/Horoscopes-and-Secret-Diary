const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/signup', (req,res) =>{
  console.log(req.body)
  db.user.findOrCreate({
    where: { email: req.body.email },
      defaults:{
        name: req.body.name,
        password: req.body.password,
        birthday: req.body.birthday
      }
    
  })
  .then(([user,created])=>{   
    if(created) {
    //if created, success and redirect to home
    console.log(`${user.name} was created`);
    //flash message
    passport.authenticate('local', {
      successRedirect: '/',
      successFlash: 'Account created and logging in'
    })(req,res);
    //before passport authenicate
    // res.redirect('/');
    } else {
      //email already exist
      console.log('Email already exist');
      // Flash
      req.flash('error','Email already exist. Please try again');
      res.redirect('/auth/signup');
    }
  })
  .catch(err =>{
    console.log('error', err)
    req.flash('error',`Error, unfortunately... ${err}`);
    res.redirect('/auth/signup');
  });
});

// Flash message
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'Welcome back.',
  failureFlash: 'Either email or password is incorrect. Please try again.'
}));


router.get('/logout', (req,res)=>{
  req.logOut();
  //Flash message
  req.flash('success','See you soon. Logging out.')
  res.redirect('/');
})

module.exports = router;
