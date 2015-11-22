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

    // Get the documents collection
    var collection = db.collection('restaurants');
    
    // update
    collection.update({reservationNo: '555Gg456'}, {$set: {cancelled: true}}, function (err, numUpdated) {
	  if (err) {
	    console.log(err);
	  } else if (numUpdated) {
	    console.log('Updated Successfully:', numUpdated);
	  } else {
	    console.log('No document found with defined "find" criteria!');
	  }
      //Close connection
      db.close();
    });
  }
});
