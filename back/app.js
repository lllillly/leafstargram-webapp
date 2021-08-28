const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const db = require("./models");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
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

///////// 연결 //////////

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 14버전부터 가능
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false, // true로 하면 안됨!(다른 사람이 로그인하면 그 사람에게 다른 사람의 정보가 전달됨)
    resave: false,
    secret: process.env.COOKIE_SECRET,
    proxy: true,
    cookie: {
      httpOnly: true, // : 네트워크끼리만 통신하겠다는 뜻
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".realdomain.com",
    },
  })
);

///////// 감싸기 /////////

app.use(passport.initialize());
app.use(passport.session());

////////////////////////

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Express Server Start With Mysql http://localhost:${PORT}`);
});
