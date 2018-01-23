// only routing in here!
'use strict'

const mainController = require('./controllers/main.controller'),
      loginController = require('./controllers/login.controller'),
      listController = require('./controllers/list.controller');


module.exports = (app, passport) => {
    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', isLoggedIn, listController.showData);

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', loginController.showLogin);

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        // redirect to the secure profile section
        successRedirect : '/profile',
        // redirect back to the signup page if there is an error
        failureRedirect : '/login',
        // allow flash messages
        failureFlash : true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup', loginController.showSignup);

    app.get('/list', isLoggedIn, listController.showData);

    app.get('/list/addlist', isLoggedIn, listController.addList);

    app.get('/list/additem', isLoggedIn, listController.addItemToList);

    app.get('/list/removelist', isLoggedIn, listController.deleteList);

    app.get('/list/removeitem', isLoggedIn, listController.deleteItem);

    // process the signup form
    app.post('/signup', isLoggedIn, passport.authenticate('local-signup', {
        // redirect to the secure profile section
        successRedirect : '/profile',
        // redirect back to the signup page if there is an error
        failureRedirect : '/signup',
        // allow flash messages
        failureFlash : true
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/profile', isLoggedIn, loginController.showProfile);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', loginController.doLogout);
};

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
    return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
