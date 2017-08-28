var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs')
var User = require('../models/user');

function login(passport) {
	passport.use('login', new LocalStrategy({passReqToCallback: true}, function(req, username, password, done) {
		User.findOne({username: username}, function(err, user) {
			if(err) { return done(err); }
			if(!user) {
				return done(null, false, req.flash('message', 'Incorrect username'));
			}
			if(!validPassword(user, password)) {
				return done(null, false, req.flash('message', 'Incorrect password'));
			}
			return done(null, user)
		})
	}));
}

function validPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

module.exports = login;