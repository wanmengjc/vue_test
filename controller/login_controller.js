/**
 * @author jc 19-03-12
 * 登录
 */
'use strict';

exports.login = async (req, res, next)=> {
  console.log(req);
  res.send({result: true})
}