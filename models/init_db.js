/**
 * @author Ward 18-7-16
 * @revise jc 18-12-22
 */
'use strict';
const cls = require('continuation-local-storage'),//启用cls
  namespace = cls.createNamespace('my-very-own-namespace');//设置事物命名空间
const Sequelize = require('sequelize');
Sequelize.useCLS(namespace);//使用那个命名空间
const Op = Sequelize.Op;
const {database, username, password, option} = require('../config/config').db;
const fs = require('fs');
const sequelize = new Sequelize(database, username, password, option); // 连接数据库
const define = (tableName, field = {}, option = {}) => { // 定义模型, 常用的属性不用重复填写了
  // !field.flag ? field.flag = {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true} : false;
  !field.del ? field.del = {type: Sequelize.BOOLEAN, defaultValue: false, comment: '删除标识'} : false;
  !field.status ? field.status = {type: Sequelize.INTEGER(3).UNSIGNED, defaultValue: 1, comment: '状态码'} : false;
  // !field.kehu_id ? field.kehu_id = {type: Sequelize.STRING(50), defaultValue: '', comment: '数据归属id'} : false;
  // !field.kehu_domain ? field.kehu_domain = {type: Sequelize.STRING(50), defaultValue: '', comment: '数据归属域名'} : false;

  !option.timestamps ? option.timestamps = true : false;
  !option.timezone ? option.timezone = '+08:00' : false;
  !option.underscored ? option.underscored = true : false;
  !option.freezeTableName ? option.freezeTableName = true : false;

  return sequelize.define(tableName, field, option);
};

const initAutoIncrement = async () => { // 初始化自增长
  try {
    const alertTableName = [
      //['admin', 100000000],
    ];

    await Promise.all(alertTableName.map(([tableName, increment]) => {
      return sequelize.query(`ALTER TABLE ${tableName} AUTO_INCREMENT ${increment}`);
    }));
  } catch (err) {
    console.log(err);
  }
};


// 需要创建完所有表后再指定关系
const init = async function () {
  await sequelize.sync({
    logging: false, // 打印sql语句
    alter: false, // 修改表中字段
    force: false, // 重构所有表
  });

  const {
    Login
  } = db;

  //TbArticle.belongsTo(User, {foreignKey: 'user_id', as: 'article'});
  //TbArticle.hasMany(TbCollection, {foreignKey: 'article_id', as: 'article_collection'});
  
  
};

const db = {Sequelize, sequelize, Op, initAutoIncrement, init, define};

module.exports = db;

const readFile = rootPath => {
  const allFile = fs.readdirSync(rootPath);

  for (let file of allFile) {
    const path = `${rootPath}/${file}`;

    if (/.+\.js$/.test(file) && file !== 'init_db.js') { // 不是文件夹
      db[file.replace('.js', '')] = require(path);

    } else if (fs.lstatSync(path).isDirectory()) { // 文件夹, 递归读取一次
      readFile(path);
    }
  }
};
readFile(__dirname);
 //db['Login'].sync({alter: true, logging: console.log});
 //db['User'].sync({alter: true, logging: console.log});
 //db['CommissionChange'].sync({alter: true, logging: console.log});
