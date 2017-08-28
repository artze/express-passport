var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs')
var User = require('../models/user');

function signup(passport) {
	passport.use('signup', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
		function findOrCreateUser() {
			User.findOne({username: username}, function(err, user) {
				if(err) { return done(err); }
				if(user) {
					return done(null, false, req.flash('message', 'Username already exists'));
				} else {
					var newUser = User();
					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.body.email;
					newUser.save(function(err) {
						if(err) {
							throw err;
						}
						console.log('User registration successful');
						done(null, newUser);
					});
				}
			})
		}
		process.nextTick(findOrCreateUser);
	}))
}

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = signup;