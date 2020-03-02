const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/mainrouter.js");
//  App creation
const app = express();

// Basic Configurtions
require("dotenv").config();
const { CLIENT_URL, PORT, NODE_ENV } = process.env;
// const whitelist = [CLIENT_URL];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

let mongodb_URL = process.env.MONGODB_URL;
if (NODE_ENV === "development") {
  mongodb_URL = process.env.MONGODB_LOCAL_URL;
  app.use(morgan("tiny"));
}
// DB connection
mongoose
  .connect(mongodb_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

// Middleware Inplaced
// app.use(cors(corsOptions));
app.use(cors({ origin: CLIENT_URL }));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route Handler Middleware
app.get("/", (req, res, next) => {
  res.json({ message: "Go to /api/v1" });
});

app.get("/api/v1", mainRouter);

// app listening on port PORT :)
const port = PORT || 8083;
app.listen(port, () => {
  console.log("Listening on Port", port);
});
