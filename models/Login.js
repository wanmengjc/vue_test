/**
 * @author jc 18-12-22
 * 登录
 */
'use strict';
const {define, Sequelize} = require('./init_db');
const {INTEGER, STRING} = Sequelize;

module.exports = define('login', {
  phone: {type: STRING, comment: '登录手机号'},
  pwd: {type: STRING(50), defaultValue: '', comment: '密码'},
});