var List = require('../models/list');
var mongoose = require('mongoose')

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
  var listid = parseInt(req.query.id);
  List.update(
      { _id: mongoose.Types.ObjectId(req.query.listid) },
      { $pull: { content: { id: listid } } },
      function(err, numAffected) {
          console.log('error: ',err);
          console.log('numAffected: ',numAffected);
      }
  );

  res.redirect('/list?list=req.query.listid');
}

function addList(req, res) {
  // create a new absence
  const newlist = new List({
    listname: req.query.listname,
    content: [],
    creationdate: new Date(),
    changedate: new Date()
  });

  newlist.save((err) => {
    if (err)
      console.log(err);
    else
    {
      console.log('List added to DB');
    }
    res.redirect('/list');
  });
}

function addItemToList(req, res) {
  var newItem = {
    id: 0,
    name: req.query.name,
    quantity: req.query.quantity,
    currency: req.query.currency
  }

  for (var i=0;i<allLists.length;i++)
  {
    var actList = allLists[i];
    if(actList.listname == req.query.listname)
    {
      newItem.id = getNewItemId(newItem, actList);
      actList.content.push(newItem);
      update(actList, function(err, result){
        if(err)
          console.log(err);
        else
          console.log('Item added to list');

        res.redirect('/list');
      });
    }
  }
}

function getNewItemId(actItem, actList)
{
  if(actList.content.length == 0)
    return 0;
  else {
    var newid = actList.content[actList.content.length - 1].id + 1;
    return newid;
  }
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
    res.render('test/listtest', {
        list : lists
    });
    allLists = lists;
  }).lean();
}
