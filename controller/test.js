/**
 * @author jc 19-03-12
 * 测试
 */
'use strict';
const test = require('../middleware/test')

exports.test = async (req, res, next)=> {
  test.test();
  console.log('controller test')
  res.send({result: true})
}