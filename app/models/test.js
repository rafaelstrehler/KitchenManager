const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
const testSchema = new Schema({
    listname: String,       // name of the list
    content: Array          // array with all records
});

// create the model
const testModel = mongoose.model('Test', testSchema);

// export the model
module.exports = testModel;
