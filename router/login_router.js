/**
 * @author jc 19-03-12
 * 登录
 */
'use strict';
const router = require('express').Router();
const $ = require('../controller/login_controller');

module.exports = router;

 router.get('/user/login', $.login) // 测试