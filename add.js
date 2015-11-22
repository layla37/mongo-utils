var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL for mongodb server
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

    // Get the collection
    var collection = db.collection('restaurants');

    // stuff to add to add
    var reservation = { resrvationNo: '555Gg456', partyName: 'Hillman'  };
    
    // insert new reservation
    collection.insert(reservation, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Documents inserted with "_id" are:', result.length, result);
      }    
      //Close connection
      db.close();
    });
  }
});
