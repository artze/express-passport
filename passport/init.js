var User = require('../models/user.js');
var login = require('./login');
var signup = require('./signup');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		console.log('Serializing user: ');
		console.log(user);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('Deserializing user:', user);
			done(err, user);
		});
	});

	login(passport);
	signup(passport);
}