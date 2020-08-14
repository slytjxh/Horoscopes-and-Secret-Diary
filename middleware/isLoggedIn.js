module.exports = (req, res, next) => {
    // do stuff
    if (req.user) {
        // GOOD - they are logged in!
        next()  // proceed as planned
    }
    else {
        // BAD - they are not logged in!
        // Send an error message + send them to the login page
        req.flash('error', 'You must be logged in to view this page')
        res.redirect('/auth/login')
    }
}