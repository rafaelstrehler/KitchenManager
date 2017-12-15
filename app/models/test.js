const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
const testSchema = new Schema({

    // first and last name of student or teacher
    was: String,
    menge: String,
    text: String,

});



// create the model
const testModel = mongoose.model('Test', testSchema);

// export the model
module.exports = testModel;
