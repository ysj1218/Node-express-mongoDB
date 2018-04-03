const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const staticRoute = require('./routes/static');
const apiRoute = require('./routes/api');

// 设置模版路径
app.set('views', path.join(__dirname, 'views'));

// 设置静态路径
app.use(express.static(path.join(__dirname, 'public')));

// 配置body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 使用服务器客户端数据通信中间件
app.use(cookieSession({
  name: 'session',
  secret: "some random charactors",
  maxAge: 24 * 60 * 60 * 1000
}))

// 使用路由
app.use("/", staticRoute);
app.use("/api/", apiRoute);

app.use((error, request, response, next) => {
	response.status(500).send({
		message: error.message
	});
});

// 监听端口号
app.listen(process.env.PORT || '3000');