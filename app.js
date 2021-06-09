const express = require("express");
const http = require("http");
const debug = require("debug")("server:server");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const CONFIG = require("./config/config"); // Load the configuartion
const mongoose = require("mongoose");


// DATABASE Connection

const db_url = `${CONFIG.db_dialect}://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
console.log('db_url', db_url);
mongoose.connect(db_url, { useUnifiedTopology: true, useNewUrlParser: true }).catch((err) => {
  console.log("MongoDB database connection failed");
  console.log(err);
});
mongoose.connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});


// Initiate the app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',
  express.static(path.join(__dirname, "uploads"), { maxAge: 31557600000 })
);

// Load API routes
app.use("/api", routes);

app.use("/", function (req, res) {
  res.statusCode = 200; // send the appropriate status code
  res.json({ message: "Welcome to Practicle task" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});


// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Get port from environment and store in Express.
const port = normalizePort(CONFIG.port || "3000");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// Event listener for HTTP server "error" event.

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
  console.log("Server listenning on port:", addr.port);
}
