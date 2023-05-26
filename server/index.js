const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const socketIO = require('socket.io');
const app = express();
//const http = require('http').Server(app);
//const io = socketIO(http);

// const port = new SerialPort( {path:"/COM10",
//   baudRate: 9600,
//   dataBits: 8,
//   parity: 'none',
//   stopBits: 1,
//   flowControl: false
// });

// io.on('connection', function(socket) {
//   console.log(`Node is listening to port COM10`);
//   socket.on("active", (arg) => {
//     console.log(arg);
//     temoin = arg;
//   });
// });

mongoose.connect("mongodb+srv://mamefatiman05:BISMILLAH@cluster0.5pgsyv4.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("DB Connection Successful");
})
.catch((err) => {
  console.log(err.message);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);


const http = require('http').createServer(app);
const io = require('socket.io')(http, {cors: {origins:"*"} });

const port = new SerialPort( {path:"COM11",
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false  
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let dt;
parser.on('data', (data) => {
  dt = data
  console.log(data);
  // io.on("connection", (socket)=>{

  //   socket.on("isOn", (msg)=>{
  //     console.log(msg);
  //   })
  
  // })
    return io.emit('slu', data)
})
0


io.emit('test', dt)






http.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});
