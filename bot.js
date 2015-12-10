var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var listOfFollowers = [];


// get a list of the most recent followers that follow you (up to 20 followers. If more than 20, we will need to use next_cursor to access more than 20 - see Twitter docs for more info on that)
function getFollowers() {
	T.get('followers/list', { screen_name: '[your twitter handle]' },  function (err, data, response) {
		// empty out array to update with the latest list of followers
		listOfFollowers = [];
		if ( err ) {
			console.error('error getting the list of followers because of: ' + err);
		}
		// console.log(data.users[0].screen_name);
		// console.log(data.users);
		for (var i = 0; i < data.users.length; i++ ) {
			listOfFollowers.push(data.users[i].screen_name);
		}
		console.log(listOfFollowers);
	});
}

// tweet to someone
function tweet( twitterHandle, message ) {
	var tweetToSend = '@' + twitterHandle + ' ' + message;
	T.post('statuses/update', { status: tweetToSend }, function(err, data, response) {
		console.log(data);
	});
}

var stream = T.stream('user');

// listen for a direct message
stream.on('direct_message', function (data) {
	var follower = data.direct_message.sender_screen_name;
	var dm = data.direct_message.text;
	console.log(follower);
	console.log(dm);
});
