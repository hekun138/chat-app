const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require("./model");
const User = models.getModel("user");
const Chat = models.getModel("chat");

//新建app
const app = express();

// 和express配合
const server = require('http').Server(app);
const io = require("socket.io")(server);

//监听用户的链接
io.on('connection', function(socket) {
  socket.on("sendmsg", function(data) {
    console.log(data);
    const {from, to, msg} = data;
    const chatid = [from,to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit("receivemsg", Object.assign({}, doc._doc));
    });
  });
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, function() {
  console.log('Node app start at port 9093');
})