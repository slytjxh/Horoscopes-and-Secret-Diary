require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION || "horoscope";
const passport = require('./config/ppConfig');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const moment = require('moment');
const aztroJs = require('aztro-js');
const axios = require('axios');
const horos = ["capricorn","aquarius","pisces","aries","taurus","gemini","cancer","leo","virgo","libra","scorpio","sagittarius"]
let API_KEY = process.env.API_KEY;


// require the authorization middleware at the top of the page
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

//secret: what we actually giving the user to use our site
//resave: save the session even if it's modified,make this false
//saveUninitialized:if we have new session,will save, therefore
//setting this to true

app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session())
//flash for temporary message to the user
app.use(flash());

// middleware to have our message accessible for every view
app.use((req, res, next) => {
  // before every route, we will attached our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  var horocopes = {};
  for(i in horos){
    const horo = horos[i];
    aztroJs.getTodaysHoroscope(horo, function(cope) {
      //console.log(cope)
      horocopes[horo] = cope;
      if(Object.keys(horocopes).length == horos.length){
        res.render('index', { alerts: res.locals.alerts,horocopes:horocopes,horos:horos});
      }
    })
  }
});

app.get('/quote', (req, res) => {
  var horo = req.query.horo;
  axios.get('https://zenquotes.io/api/random')
    .then((response)=>{
        console.log(response);
        
        res.render('quote', {data:response.data[0]})
    })
    .catch(err =>{
        console.log('error',err)
    })
  
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
