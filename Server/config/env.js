const dotenv = require("dotenv");

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toNumber(process.env.PORT, 3600),
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_URI || "",
  corsOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  portfolioUser: process.env.PORTFOLIO_USER || process.env.USER_NAME || "ladcva",
  blogAdminToken: process.env.BLOG_ADMIN_TOKEN || "",
};

module.exports = env;
