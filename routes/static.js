var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.redirect('/index.html');
});

router.get('/position', function(req, res, next) {
	// 登陆校验
	if (req.session.username) {
		res.redirect('/position.html');
	}else {
		res.redirect('/index.html');
	}
});

module.exports = router;
