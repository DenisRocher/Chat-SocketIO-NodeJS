// Levantar servidor con socket
var express = require('express');
var app = express();
server = require('http').Server(app);
var io = require('socket.io')(server,{
    cors: { // Permite el acceso de orígenes mixtos (CORS)
        origin: '*'
    }
});
//console.log(io);

// Middleware de Express
app.use(express.static('client'));

app.get('/hola-mundo',function(req, res){
  res.status(200).send('Hola Mundo desde curso Socket');
});

var messages = [{
  id:1,
  text:'Bienvenido al chat privado de Familia RocherValenzuela',
  nickname: 'Bot - denis.rocher@gmail.com'
}];

//Abrir conexión al socket
io.on('connection',function(socket){
  console.log('El cliente con IP: '+socket.handshake.address+' se ha conectado');
  socket.emit('messages',messages);

  socket.on('add-message',function(data){
    messages.push(data);
    //console.log(messages);
    io.sockets.emit('messages', messages);
  });
});

//Levantar el servidor
server.listen(6600,function(){
  console.log('Servidor está funcionando en http://localhost:6600/hola-mundo')
});