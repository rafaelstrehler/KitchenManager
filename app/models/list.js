const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
const listSchema = new Schema({
    listname: String,       // name of the list
    content: Array,         // array with all records
    creationdate: Date,     // creationdate of list
    changedate: Date        // date of last change
});

// create the model
const listModel = mongoose.model('List', listSchema);

// export the model
module.exports = listModel;
