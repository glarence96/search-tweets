const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const socketIo = require("socket.io");
const http = require('http')

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  console.log(connection.models)
})

const server = http.createServer(app);
const io = socketIo(server);

const twitter = require('./routes/twitter.route')
app.use('/twitter', twitter)


const streamTweets = (socket, token) => {
  let stream;
  const streamURL = new URL(
    "https://api.twitter.com/2/tweets/search/stream?tweet.fields=context_annotations&expansions=author_id"
  );

  const config = {
    url: streamURL,
    auth: {
      bearer: token,
    },
    timeout: 31000,
  };

  try {
    const stream = request.get(config);

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            socket.emit("error", json);
            reconnect(stream, socket, token);
          } else {
            if (json.data) {
              socket.emit("tweet", json);
            } else {
              socket.emit("authError", json);
            }
          }
        } catch (e) {
          socket.emit("heartbeat");
        }
      })
      .on("error", (error) => {
        // Connection timed out
        socket.emit("error", errorMessage);
        reconnect(stream, socket, token);
      });
  } catch (e) {
    socket.emit("authError", authMessage);
  }
};

const reconnect = async (stream, socket, token) => {
  timeout++;
  stream.abort();
  await sleep(2 ** timeout * 1000);
  streamTweets(socket, token);
};

io.on("connection", async (socket) => {
  try {
    const token = BEARER_TOKEN;
    io.emit("connect", "Client connected");
    const stream = streamTweets(io, token);
  } catch (e) {
    io.emit("authError", authMessage);
  }
});


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});