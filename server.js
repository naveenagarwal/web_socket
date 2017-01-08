var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 7000});

wss.on('connection', function connection(ws) {
  console.log('total clients', wss.clients.length);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      // if (client !== ws)
      client.send(message);
    });

  });

});
