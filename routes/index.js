var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = function(passport) {

	// GET login page
	router.get('/', function(req, res) {
	  res.render('index', {message: req.flash('message')});
	});

	// handle login POST
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	// GET signup page
	router.get('/signup', function(req, res) {
		res.render('register', {message: req.flash('message')});
	});

	// handle signup POST
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// GET home page
	router.get('/home', isAuthenticated, function(req, res) {
		res.render('home', {user: req.user});
	});

	// handle logout
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	return router;
}
