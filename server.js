'use strict'

// grab dependencies
const express = require('express'),
      app = express(),
      port = process.env.PORT || 8080,
      expressLayouts = require('express-ejs-layouts'),
      mongoose = require('mongoose'),
      exphbs = require('express-handlebars'),
      passport = require('passport'),
      flash = require('connect-flash'),
      path = require('path'),

      morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      session = require('express-session'),

      configDB = require('./config/database');


// configure application
// set static folder for assets
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// read cookies (needed for auth)
app.use(cookieParser());
// get information from html forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// connect to database
mongoose.connect(configDB.url);
// pass passport for configuration
require('./config/passport')(passport);


// set hbs as templating engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs', helpers: require("./app/helpers/hbs.js").helpers}));
app.set('view engine', 'hbs');


// required for passport
// session secret
app.use(session({ secret: 'nancisawesome', saveUninitialized: true, resave: true }));
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());
// use connect-flash for flash messages stored in session
app.use(flash());

// set routes: pass in app and fully configured passport
require('./app/routes')(app, passport);

// start server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
