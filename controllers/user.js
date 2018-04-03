const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {getResponse} = require("../utils/utils.js");

const signUp = function(req, res, next) {
	User.findOne({username: req.body.username})
		.then((user) => {
			if (user) {
				res.json(getResponse({success: false}));
			}else {
				bcrypt.hash(req.body.password, 10)
					.then((password) => {

						const user = new User({
							username: req.body.username,
							password: password,
							email: req.body.email
						});

						user.save().then(() => {
							res.json(getResponse({success: true}));
						})

					})
			}
		})
}

const signIn = function(req, res, next) {
	User.findOne({username: req.body.username})
		.then((user) => {
			if (!user) {
				res.json(getResponse({login: false}));
			}else {
				bcrypt.compare(req.body.password, user.password)
					.then((result) => {
						if (result) {
							req.session.username = user.username;
							res.json(getResponse({
								login: true,
								username: user.username
							}));
						}else {
							res.json(getResponse({login: false}));
						}
					})
			}
		})
}

const isLogin = function(req, res, next) {
	res.json(getResponse({
		login: req.session.username ? true: false,
		userName: req.session.username
	}));
}

const logout = function(req, res, next) {
	req.session = null;
	res.json(getResponse({logout: true}));
}

module.exports = {signUp, signIn, isLogin, logout};