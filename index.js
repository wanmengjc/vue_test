const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const config = require('./config/config');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const cors = require('cors');
const fs = require('fs')
const {init, initAutoIncrement} = require('./models/init_db');

// trust proxy
app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

// cors
app.use(cors());

// session
app.use(cookieParser('secretSign#chslab_cookie_^&*^%%'));
app.use(session({
    store: new RedisStore(config.redisOptions),
    secret: 'chslab_secret_#@%^^',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        maxAge: 2 * 60 * 60 * 1000, // 毫秒
    }
}));

// parsing application/x-www-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// contributor
// const contributorJemo = require('./contributor/jemo');
// contributorJemo(app);

// static-file
app.use(express.static('./v_client/dist'));

// static route //前后分离要写这个
// app.get('/*', function (req, res, next) {
//     const staticRegex = /.+\.(js|css|map)/;
//     if(staticRegex.test(req.path)) {
//       next();
//     } else {
//       res.sendFile(path.join(__dirname,'./v_client/dist/index.html'));
//     }
// });

//递归读取路由
const readFile = rootPath => {
  const allFile = fs.readdirSync(rootPath);

  for (let file of allFile) {
    const path = `${rootPath}/${file}`;

    if (/.+\.js$/.test(file)) { // 不是文件夹
      app.use(require(path));
    } else if (fs.lstatSync(path).isDirectory(path)) { // 文件夹, 递归读取一次
      readFile(path);
    }
  }
};
readFile(`${__dirname}/router`);
// logger
global.logger = log4js.getLogger();
logger.level = 'info';

app.use(function (err, req, res, next) {
    logger.error(err);
    var code = err.code || 500;
    res.send({
        result: 'err',
        message: err.message,
        code: code
    });
});

const PORT = process.env.PORT || 3001;
init().then(async () => {
  // await initAutoIncrement(); // 初始化表的自增长id
  app.listen(PORT, function () {
    logger.info('running at ', PORT);
  });
}).catch(err => {
  logger.error(err);
});
