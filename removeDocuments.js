var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL for mongodb server
var url = 'mongodb://localhost:27017/test';

var collection = db.collection('restaurants');

// remove one reservation
var removeReservation = function(db, callback) {
   collection.deleteOne(
      { "resrvationNo": "555Gg456" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};

// Remove many reservations
var removeReservations = function(db, callback) {
   collection.deleteMany(
      { cancelled: true },
      function(err, results) {
         console.log('removing cancelled reservations');
         callback();
      }
   );
};

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
 	removeReservation(db, function() {
    	db.close();
    });
  }
});
