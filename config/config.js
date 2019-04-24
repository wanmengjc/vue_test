// 判断是否为生产环境
const productENV = process.env.NODE_ENV === 'production';

module.exports = {
  // redis
  redisOptions: {
    host: 'localhost',
    port: 6379,
    //password: 'uWU0^hxXJF',
    logErrors: true
  },
  // mysql
  db: {
    database: productENV ? 'haotu' : 'haotu',
    username: productENV ? 'chslab' : 'chslab',
    password: productENV ? 'db@haotu!' : 'Admin@chslab9',
    option: {
      dialect: 'mysql',
      host: productENV ? '172.21.16.14' : '192.168.31.4',
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 40000,
      },
      timezone: '+08:00',
      operatorsAliases: false, // 警告提示
      //logging: console.log // 打印sql
      logging: false,
    },
  },
}
