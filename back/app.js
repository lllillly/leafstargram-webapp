const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    console.log("🍀 Mysql Database Connected");
  })
  .catch(console.error);

const SERVER_MODE = process.env.NODE_ENV;
const app = express();
const PORT = process.env.PORT;

console.log(`⭐️⭐️⭐️ ${SERVER_MODE} ⭐️⭐️⭐️`);

if (SERVER_MODE === "development") {
  app.use(morgan(`dev`));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
      //main content setting 이라고 생각하면 됨.
    })
  );
} else {
  app.use(morgan(`combined`));
  app.use(helmet());
  app.use(hpp());
  app.use(
    cors({
      origin: [],
      credentials: true,
    })
  );
}

app.listen(PORT, () => {
  console.log(`Express Server Start With Mysql http://localhost:${PORT}`);
});
