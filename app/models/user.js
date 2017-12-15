'use strict'

const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt-nodejs');


// define the schema for the user model
var userSchema = mongoose.Schema({

    local: {
        email      : String,
        password   : String,
        first_name : String,
        last_name  : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to the app
module.exports = mongoose.model('User', userSchema);
