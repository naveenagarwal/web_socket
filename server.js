// var WebSocketServer = require('ws').Server;
// var wss = new WebSocketServer({port: 7000});

// wss.on('connection', function connection(ws) {
//   console.log('total clients', wss.clients.length);
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);

//     wss.clients.forEach(function each(client) {
//       // if (client !== ws)
//       client.send(message);
//     });

//   });

// });



var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('index');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('message', function(msg){
    console.log("message: ", msg.channel);
    // io.emit("message", msg.channel);

    if(msg.channel){
      console.log("emmiting on channel");
      io.emit(msg.channel, msg);
      // socket.on(msg.channel, function(msg){
      //   // console.log('msg.channel: ' + msg.channel);
      // });
    }

  });


});

http.listen(process.env.PORT, function(){
  console.log('listening on *:',process.env.PORT);
});
