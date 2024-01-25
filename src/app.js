if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");

app.use(cors());
app.use(express.json());
app.use("/movies", moviesRouter);

app.use((req, _res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, _req, res, _next) => {
  const { status = 500, message = `Something went wrong!` } = error;
  console.log(`Status: ${status}, Message: ${message}`);
  res.status(status).json({ error: [message] });
});

module.exports = app;
