const express = require('express');
const db = require('../models');
const router = express.Router();

//add new diary note
router.post('/', (req,res)=>{
    db.comment.create({
        //title,content
        title: req.body.title,
        content:req.body.content
    })
    .then(()=>{
        // go back profile
        res.redirect('profile')
    })
})

module.exports = router