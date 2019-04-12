/**
 * @author Ward 18-7-16
 */
'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {database, username, password, option} = require('../config/config').db;
const fs = require('fs');
const sequelize = new Sequelize(database, username, password, option); // 连接数据库
const initAutoIncrement = async () => {
  try {
    const tableNameAll = await sequelize.getQueryInterface().showAllSchemas(); // 得到所有表名
    let sqlVal = []; //设置开始自增长的id

    for (let val of tableNameAll) {
      for (let key in val) {
        let [number, tableName] = [100000000, val[key]];

        if (tableName === 'user') number = 1;

        if (tableName !== 'chs_area_v1') {
          sqlVal.push(sequelize.query(`ALTER TABLE ${tableName} AUTO_INCREMENT ${number}`));
        }
      }
    }
    return await Promise.all(sqlVal);
  } catch (err) {
    console.error('init_db_initAutoIncrement_error: ', err);
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
   
  } = db;
  
  //专题分类和分销专题
  //ShopClasses.hasMany(ShopTopic, {foreignKey: 'classes', as: 'shopTopic'});
  //ShopTopic.belongsTo(ShopClasses, {foreignKey: 'classes', as: 'ShopClasses'});
};

const db = {Sequelize, sequelize, Op, initAutoIncrement, init};
module.exports = db;

const modelNameAll = fs.readdirSync(process.cwd() + '/models');
for (let modelName of modelNameAll) {
  if (modelName.indexOf('.js') > -1) {
    modelName = modelName.replace('.js', '');
    db[modelName] = require('../models/' + modelName);
  }
}

//db['OrderItemReturn'].sync({alter: true, logging: console.log});
//db['OrderItem'].sync({alter: true, logging: console.log});
