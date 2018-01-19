var List = require('../models/list');

/*
 public functions
 */

module.exports = {

  showData : showData,
  addData : addData,
  showCreate : showCreate,
  updateData : updateData
}

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('list/create', {
    errors: req.flash('errors')
  });
}

function addData(req, res) {

}

function updateData(req, res) {

  //var content_array = {name: "mimimi", quantity: 3, currency: "stk"}
  // create a new absence
  /*const newtest = new Test({
    listname: "Hello",
    content: []
  });*/

  var testItem = {
    content: [
      {
        name: "Gruzi",
        quantity: 11,
        currency: "löffel"
      }
    ]
  }

  List.update( {listname: "Hello"}, {$set: testItem}, function(err, result) {
    // assert.equal(null, err);
    console.log('Item updated');
  });
  
  console.log('it works');
  // save Absence
/*
newtest.save((err) => {
    if (err)
      console.log(err);

    // set a successful flash message
    req.flash('success', 'Absenz erfolgreich erstellt!');
    
  });*/
  
  res.redirect('/list');
}

function showData(req, res) {
  List.find({}, (err, lists) => {
    res.render('list/index', {
        list : lists
    });
  }).lean();
}
