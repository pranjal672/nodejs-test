require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

const PORT = process.env.PORT || 3500;

const { logger } = require("./middleware/logEvents.js");
const errorHandler = require("./middleware/errorHandler.js");

// connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

// handle options credentials check - before cors
// and fetch cookies credentials requirement
app.use(credentials);

// Cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json data
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// // serve static file
// app.use("/", express.static(path.join(__dirname, "/public")));
// app.use("/subdir", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logOut", require("./routes/logOut"));
// app.use("/subdir", require("./routes/subdir"));
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

//sending 404 error page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts(json)) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// custom error handler
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDb.");
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
