/**
 * @author jc 19-03-12
 * 测试
 */
'use strict';
const router = require('express').Router();
const $ = require('../controller/test');

module.exports = router;

 router.get('/test/all', $.test) // 测试