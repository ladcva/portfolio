const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./db/mongoose");

async function start() {
  await connectDatabase();

  const server = app.listen(env.port, () => {
    console.log(`Portfolio API listening on ${env.port}`);
  });

  return server;
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
