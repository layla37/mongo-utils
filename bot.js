var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

// get the list of followers
T.get('followers/list', { screen_name: '[twitter_handle_here]' },  function (err, data, response) {
	var listOfFollowers = [];
	if ( err ) {
		console.error('error getting the list of followers because of: ' + err);
	}
	for (var i = 0; i < data.users.length; i++ ) {
		listOfFollowers.push(data.users[i].screen_name);
	}
});

// tweet to someone
function tweet( twitterHandle ) {
	var followersHandle = '@' + twitterHandle;
	var messageToThem = 'hey there!';
	var tweetToSend = followersHandle + ' ' + messageToThem;
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
