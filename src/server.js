const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server })
const connections = [];
wss.on('connection', (ws) => {
  connections.push(ws);
  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
      // // if (message.data instanceof Blob) {
      //   const reader = new FileReader()
      //   console.log(reader.readAsText(message.data));
      // // }
      console.log(message)
      //log the received message and send it back to the client
      // console.log('received: %s', payload);
      // ws.send(`Hello, you sent -> ${payload}`);
      connections.forEach(connection => connection.send(message))
      // ws.send(message)
  });

  //send immediatly a feedback to the incoming connection    
  ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});