import express from 'express';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'
import cors from 'cors'
import redis from 'redis'


const app = express();
app.use(cors())
const server = app.listen(4000, () => {
    console.log('Server Started..');
});


app.use(express.static('public'));

const io = new Server(server,{
cors: {
    origin: 'http://localhost:8000',
	methods: [ "*"],
    
	transports: ['websocket', 'polling'],
	credentials: true
},
        allowEIO3: true});

	/*
io
	.use(function(socket, next){
    if (socket.handshake.query && socket.handshake.query.token){
      jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      });
    }
    else {
      next(new Error('Authentication error'));
    }    
  }) 
  */
  
  


  
let clients = [];
let users = [];
var clientsCount = 0;
const channel = 'message'
/*
const publisher = redis.createClient();

console.log(`Started ${channel} channel publisher...`)
publisher.publish(“notification”, “{\”message\”:\”Hello world from Asgardian!\”}”, function(){
 process.exit(0);
});
//publisher.publish(channel, 'free');





//var redisClient = redis.createClient();
/*    redisClient.subscribe('message');
    redisClient.subscribe('channel-name');
    redisClient.subscribe('Client');
	redisClient.subscribe('waiting_accept');
   redisClient.on("message", function(channel, data) {
		console.log("Message received on redis");
		console.log(data)
        socket.emit(channel, data);
    });
	*/
	/*
redis.connect()
redis.on('error', (err) => console.log('Redis Client Error', err));

redis.set('key', '1');


redis.subscribe('test-channel', function () {
    console.log('Redis: test-channel subscribed');
});
redis.subscribe('channel', function () {
    console.log('Redis: channel subscribed');
});

redis.subscribe('message', function () {
    console.log('Redis: message subscribed');
});
	*/
	
	var redisClient = redis.createClient({ host: "localhost", port: 6379 });
	redisClient.connect();
let messageCount = 0;
	redisClient.on('connect', function() {
  console.log('Redis Connected!');
});
//redisClient.subscribe('laravel_database_channel');
//redisClient.subscribe('message');
//redisClient.subscribe('channel');
/*
redisClient.subscribe('channel', function (data) {
    console.log('Redis: laravel database channel message received from laravel');
	console.log(data)
});

redisClient.pSubscribe('user.*', (message, channel) => {
	console.log('For User');
  console.log(message, channel); // 'message', 'channel'
});

redisClient.pSubscribe('client.*', (message, channel) => {
	console.log('For User');
  console.log(message, channel); // 'message', 'channel'
});

redisClient.pSubscribe('company.*', (message, channel) => {
	console.log('For Company');
  console.log(message, channel); // 'message', 'channel'
});


redisClient.subscribe('message',  function(message) {
	
    console.log('Redis: message channel message received');
	console.log(message)
});
*/
/*
redisClient.on("message", function (channel, message) {
  //console.log("sub channel " + channel + ": " + message);
  console.log(message)
});
*/




redisClient.pSubscribe('user.*', (message, channel) => {
	console.log('For User');
  console.log(message, channel); // 'message', 'channel'
});

redisClient.pSubscribe('select-user.*', (message, channel) => {
	console.log('Admin Vieded Message page');
  console.log(message, channel); // 'message', 'channel'
});
redisClient.pSubscribe('selectuser.*', (message, channel) => {
	console.log('Admin Vieded Message page');
  console.log(message, channel); // 'message', 'channel'
});

redisClient.pSubscribe('client.*', (message, channel) => {
	console.log('For User');
  console.log(message, channel); // 'message', 'channel'
});

redisClient.pSubscribe('company.*', (message, channel) => {
	console.log('For Company');
  console.log(message, channel); // 'message', 'channel'
});


redisClient.subscribe('message',  function(message) {
	
    console.log('Redis: message channel message received');
	console.log(message)
});


redisClient.on('error', (err)=>{
    console.log(err.message)
})
	redisClient.subscribe('channel', function (data) {
    console.log('Redis: laravel database channel message received from laravel');
	console.log( JSON.parse(data))
	io.emit('message',  JSON.parse(data));
	
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  const userId = socket.handshake.auth.userId; // The global UserID.
  const userType = socket.handshake.auth.userType; //Client //User
  
  if (!username) {
    return next(new Error("invalid username"));
  }
  if (!userId) {
    return next(new Error("invalid UserId"));
  }
  
  if (!userType) {
    return next(new Error("invalid User Type"));
  }
  socket.username = username;
  socket.userId = userId;
  next();
})


io.on('connection', (socket) => {
	
	//add user session to socket.
	
  //  redisClient.subscribe('message');
    //redisClient.subscribe('Client');
    //redisClient.subscribe('channel');
	
   
	//console.log(socket)
    console.log('socket connected..', socket.id);
	
	clientsCount++;
   socket.emit('newclientconnect',{ description: 'Hey, welcome!'});
   io.emit('newclientconnectcount',{ description: clientsCount + ' clients connected!'})
   
   
   
   
	//added for step 2 //list all sockets and ...
	for (let [id, socket,userType] of io.of("/").sockets) {
	   if(userType == 'Client'){
		   clients.push({
			  userID: id,
			  username: socket.username,
			});
		}
	   else {
		   
			users.push({
			  userID: id,
			  username: socket.username,
			});
		}
	}
	

	   
/*
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
		console.log('Emit chat tiggered');
    });
    socket.on('message', (data) => {
		console.log(data);
        io.emit('message', data);
		console.log('Message received : ');
    });
	 socket.on('channel', (data) => {
		console.log('Channel Message received : ');
		console.log(data);
        io.emit('message', data);
    });
	socket.on('chat message', function(message) {
        io.emit('message', message);
		console.log('Chat Message received : '+ message);
    });
	
	socket.on('new client', function(client) {
        //io.emit('message', message);
		var message = 'Welcome to the company Client Support system';
		io.to(socket.id).emit('message', message);
		//Welcome to the dashboard client.
		console.log('New Client Connected to socket');
		console.log(message);
    });
	*/
	
	socket.onAny((event, ...args) => {
		console.log(event, args);
	});

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
		console.log('Somebody is typing '+ data.nick);
    });
	
    socket.on('disconnect',(reason)=>{
		//clearInterval(interval);
		
		console.log(`disconnect ${socket.id} due to ${reason}`);
		clientsCount--;
      io.sockets.emit('newclientconnectcount',{ description: clientsCount + ' clients connected!'})
	});
	
	socket.on('newclientconnectcount',() => {
	socket.emit('newclientconnectcount',{ description: clientsCount + ' clients connected!'})
	});
	
	
	socket.on("ping", (cb) => {
		console.log("ping");
		cb();
	});
  
});
/*var interval = setInterval(function() {
	console.log('This is a message from the server!  ' + new Date().getTime());
	//client.send('This is a message from the server!  ' + new Date().getTime());
},5000);
*/