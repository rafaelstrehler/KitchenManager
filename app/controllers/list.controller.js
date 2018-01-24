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
  deleteList : deleteList,
  editListname : editListname,
  editItem : editItem
}

function deleteList(req, res)
{
  List.deleteOne({ _id: mongoose.Types.ObjectId(req.query.listid) }, function (err) {});
  res.redirect('/list');

}

function deleteItem(req, res)
{
  var contentid = parseInt(req.query.id);
  List.update(
      { _id: mongoose.Types.ObjectId(req.query.listid) },
      { $pull: { content: { id: contentid } } },
      function(err, numAffected) {
          console.log('error: ',err);
          console.log('numAffected: ',numAffected);
      }
  );

  var current_list = req.query.listid; //<-- list _id
  res.redirect('/list?current_list=' + current_list);

}

function addList(req, res) {
  // create a new list
  const newlist = new List({
    user_id: req.user._id,
    listname: req.query.listname,
    content: [],
    creationdate: new Date(),
    changedate: new Date()
  });

  newlist.save((err, list) => {
    if (err)
      console.log(err);
    else
    {
      console.log('List added to DB');
    }
    console.log(list._id);
    var current_list = list._id;
    res.redirect('/list?current_list=' + current_list);
  });
}

function editListname(req, res) {
  List.update(
    { _id: mongoose.Types.ObjectId(req.query.listid) },
    { $set: { listname: req.query.newlistname } },
    function(err, numAffected) {
      console.log('error: ', err);
      console.log('numAffected: ', numAffected);
      var current_list = req.query.listid; //<-- list _id
      res.redirect('/list?current_list=' + current_list);
    }
  )
}

function editItem(req, res) {
  var newItem = {
    name: req.query.name,
    quantity: req.query.quantity,
    currency: req.query.currency
  }
  console.log(req.query);

  List.update({_id: mongoose.Types.ObjectId(req.query.listid), 'content.id': mongoose.Types.ObjectId(req.query.itemid)}, {$set: {
      'content.$.name': req.query.name,
      'content.$.quantity': req.query.quantity,
      'content.$.currency': req.query.currency
  }},    function(err, numAffected) {
        console.log('error: ', err);
        console.log('numAffected: ', numAffected);
        var current_list = req.query.listid; //<-- list _id
        res.redirect('/list?current_list=' + current_list);
      }
  );



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
    if(actList._id == req.query.listname)
    {

      newItem.id = mongoose.Types.ObjectId();
      actList.content.push(newItem);
      update(actList, function(err, result){
        if(err)
          console.log(err);
        else
          console.log('Item added to list');
          console.log(actList.listname);

          var current_list = req.query.listname; //<-- list _id
          res.redirect('/list?current_list=' + current_list);

      });
    }
  }
}

function getNewItemId(actList)
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
  List.update( {_id: actList._id}, {$set: actList}, function(err, result) {
    callback(err, result);
  });
}

function showData(req, res) {
  List.find({user_id: req.user._id}, (err, lists) => {
    res.render('list/index', {
        list : lists
    });
    allLists = lists;
  }).lean();
}
