const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

//  App creation
const app = express();

// Basic Configurtions
require("dotenv").config();
const { CLIENT_URL, PORT, NODE_ENV } = process.env;
// const whitelist = [CLIENT_URL, "http://localhost:8083/"];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };
if (NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

// Middleware Inplaced
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route Handler Middleware
app.get("/", (req, res, next) => {
  res.json({ message: "Go to /api/v1" });
});

app.get("/api/v1", (req, res, next) => {
  res.json({ time: JSON.stringify(Date()) });
});

// app listening on port PORT :)
const port = PORT || 8083;
app.listen(port, () => {
  console.log("Listening on Port", port);
});
