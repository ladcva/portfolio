const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const likeRoute = require("./Routes/likeMethods");
const rankRoute = require("./Routes/rankMethods");
const blogRoute = require("./Routes/blogMethods");
const contentRoute = require("./Routes/contentMethods");
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (env.nodeEnv !== "test") {
  app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
}

app.get("/", (req, res) => {
  res.json({ status: 200, message: "Portfolio API running" });
});

app.get("/health", (req, res) => {
  res.json({ status: 200, uptime: process.uptime() });
});

app.use("/likes", likeRoute);
app.use("/ranks", rankRoute);
app.use("/api/content", contentRoute);
app.use("/api/blogs", blogRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
