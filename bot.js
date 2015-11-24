var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);

// get the list of followers
T.get('followers/list', { screen_name: '[twitter_handle_here]' },  function (err, data, response) {
	if ( err ) {
		console.error('error getting the list of followers because of: ' + err);
	}
	// tweet to the first one on your list (your latest follower)
	console.log(data.users[0].screen_name);
	tweet( data.users[0].screen_name );
})



function tweet( twitterHandle ) {
	var followersHandle = '@' + twitterHandle;
	var messageToThem = 'hey there!';
	var tweetToSend = followersHandle + ' ' + messageToThem;
	T.post('statuses/update', { status: tweetToSend }, function(err, data, response) {
		console.log(data);
	});
}
