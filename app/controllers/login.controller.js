'use strict'

module.exports = {

    // render the page and pass in any flash data if it exists

    // shows the login form
    showLogin: (req, res) => {
        res.render('login/login', { message: req.flash('loginMessage') });
    },

    // shows the signup form
    showSignup: (req, res) => {
        res.render('login/signup', { message: req.flash('signupMessage') });
    },

    // shows the profile
    showProfile: (req, res) => {
        res.render('login/profile', {
            // get the user out of session and pass to template
            user : req.user
        });
    },

    // does logout
    doLogout: (req, res) => {
        req.logout();
        res.redirect('/');
    }
};
