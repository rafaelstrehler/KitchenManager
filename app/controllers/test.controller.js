const Test = require('../models/test');

/*
 public functions
 */

module.exports = {

  showTestData  : showTestData,
  addTestData   : addTestData,
  showCreate    : showCreate

}


/**
 * Show the create form
 */
function showCreate(req, res) {
  res.render('test/create', {
    errors: req.flash('errors')
  });
}

function addTestData(req, res) {
  // create a new absence
  const newtest = new Test({
    was: req.body.was,
    text: req.body.text
  });

  // save Absence
  newtest.save((err) => {
    if (err)
      console.log(err);

    // set a successful flash message
    req.flash('success', 'Absenz erfolgreich erstellt!');

    res.redirect('/test');
  });
}

function showTestData(req, res) {


  Test.find({}, (err, tests) => {

    res.render('test/index', {
        test : tests
    });
  }).lean();
}
