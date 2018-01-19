const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// create a schema
const listSchema = new Schema({
    listname: String,       // name of the list
    content: Array,         // array with all records
    changedate: Date,       // date of last change in list
    creationdate: Date      // creation-date of list
});

// create the model
const listModel = mongoose.model('Lists', listSchema);

// export the model
module.exports = listSchema;
