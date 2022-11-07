const express = require("express");
const cors = require("cors");
const planetsRouter = require("../routes/planets/planets.router");

const CORS_WHITELIST = ["http://localhost:3000"];

const app = express();
// Middlewares
app.use(cors({ origin: CORS_WHITELIST }));
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
