var Lists = require('../models/lists');

/*
 public functions
 */

module.exports = {

    showData : showData,
    updateData : updateData,
    showCreate : showCreate

}

/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('lists/create', {
    errors: req.flash('errors')
  });
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

  Lists.update( {listname: "Hello"}, {$set: testItem}, function(err, result) {
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
  
  res.redirect('/lists');
}

function showData(req, res) {
  Lists.find({}, (err, lists) => {
    res.render('lists/index', {
        list : lists
    });
  }).lean();
}
