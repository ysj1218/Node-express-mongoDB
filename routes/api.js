const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.js");
const jobController = require("../controllers/job.js");
const upload = require("../utils/imgUpload.js");

// 用户相关路由
router.post('/user/signUp', userController.signUp);
router.post('/user/signIn', userController.signIn);
router.get('/user/isLogin', userController.isLogin);
router.get('/user/logout', userController.logout);

// 职位相关路由
router.post('/job/addOrUpdate', upload.single("logo"), jobController.addOrUpdate);
router.get('/job/getList', jobController.getList);
router.get('/job/getItem', jobController.getItem);
router.get('/job/deleteItem', jobController.deleteItem);

module.exports = router;