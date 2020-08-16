const express = require('express')
const db = require('../models')
const axios = require('axios')
const router = express.Router()
const {response} = require('express')

//GET quotes, when user click secrest of they
router.get('/', (req,res)=>{
    let result = {
        params:{
            q: quote,
            a: author
        }
    }
    axios.get('https://zenquotes.io/api//api/random', result)
    .then((response)=>{
        res.render('quote', {quote:quote, author:author})
    })
    .catch(err =>{
        console.log('error',err)
    })
})

//add quote to profile
router.post('/', (req,res)=>{
    let newData = req.body;
    db.quote.findOrCreate({
        where: {content: newData.q},
        defaults: {authorName: newData.a}
        
    })
    .then(([newQuote, created]) =>{
        console.log(`Was this created? ${created}`);
        res.redirect('profile');
    })

    .catch(err => {
        console.log('error',err);
        res.send('Sorry, no data')
    })
});



module.exports = router