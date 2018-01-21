var List = require('../models/list');

/*
 public functions
 */

 var allLists = "";

module.exports = {
  showData : showData,
  addList : addList,
  addItemToList : addItemToList,
  deleteItem : deleteItem,
  deleteList : deleteList
}

function deleteList(req, res)
{

}

function deleteItem(req, res)
{
  
}

function addList(req, res) {
  // create a new absence
  const newlist = new List({
    listname: req.body.title,
    content: [],
    creationdate: new Date(),
    changedate: new Date()
  });

  newlist.save((err) => {
    if (err)
      console.log(err);    
    else 
      console.log('List added to DB');
  });
}

function addItemToList(req, res) {
  var newItem = {
    name: req.query.name,
    quantity: req.query.quantity,
    currency: req.query.currency
  }

  for (var i=0;i<allLists.length;i++)
  {
    var actList = allLists[i];
    if(actList.listname == req.query.listname)
    {
      actList.content.push(newItem);
      update(actlist, function(err, result){
        if(err)
          console.log(err);
        else
          console.log('Item added to list');
      });
    }
  }  
  res.redirect('/list');
}

function update(actList, callback)
{
  actList.changedate = new Date();
  List.update( {listname: actList.listname}, {$set: actList}, function(err, result) {
    callback(err, result);
  });
}

function showData(req, res) {
  List.find({}, (err, lists) => {
    res.render('list/index', {
        list : lists
    });
    allLists = lists;
  }).lean();
}
