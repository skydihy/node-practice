const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const planetsRouter = require("../routes/planets/planets.router");
const launchesRouter = require("../routes/launches/launches.router");

const CORS_WHITELIST = ["http://localhost:3000"];

const app = express();
// Middlewares
app.use(cors({ origin: CORS_WHITELIST }));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
