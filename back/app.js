const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const path = require("path");
const fs = require("fs");

//
const userRouter = require("./routes/userRouter");
const feedRouter = require("./routes/feedRouter");
passportConfig();

db.sequelize
  .sync()
  .then(() => {
    console.log("🍀 Mysql Database Connected");
  })
  .catch(console.error);
const SERVER_MODE = process.env.NODE_ENV;
const app = express();
const PORT = process.env.PORT;

console.log(`🍀🍀🍀🍀 ${SERVER_MODE} 🍀🍀🍀🍀`);

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없습니다. 새로 생성합니다.");
  fs.mkdirSync("uploads");
}

if (SERVER_MODE === "development") {
  app.use(morgan(`dev`));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".realdomain.com",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRouter);
app.use("/api/feed", feedRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Express Server Start With Mysql http://localhost:${PORT}`);
});
