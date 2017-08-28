var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	username: 'string',
	password: 'string',
	email: 'string'
});

var User = mongoose.model('User', schema);

module.exports = User;