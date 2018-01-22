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
  console.log("start deleting");
  for(var i=0;i<allLists.length;i++)
  {
    console.log("1");
    actList = allLists[i];
    if(actList.listname == req.query.listname)
    {
      console.log("2");
      for(var j=0;i<actList.content.length;j++)
      {
        console.log("3");
        var actContent = actList.content[j];
        if(actContent.id == req.query.id)
        {
          console.log("4");
          actList.content.splice(actList.content.indexOf(actContent), 1);
          actList.content.splice(j, 1);
          actList.content[j] = actContent;
          update(actList, function(err, res) {
            console.log("5");
            if(err)
              console.log(err);
            else
              console.log('Item deleted');
          });
          break;
        }
      }
    }
  }
  res.redirect('/list');
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
