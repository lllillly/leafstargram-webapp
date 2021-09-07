const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { email, password, nickname, birth } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);

  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (exUser) {
      return res.status(403).send("이미 가입된 이메일 입니다.");
    }

    await User.create({
      email,
      nickname,
      password: hashPassword,
      birth,
    });

    return res.status(201).json({ result: true });
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send("회원가입을 할 수 없습니다. 고객센터에 문의해주세요.");
  }
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log("❌Login Error!");
        console.error(loginErr);
        return next(loginErr);
      }

      const withOutPasswordUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      return res.status(200).json(withOutPasswordUser);
    });
  })(req, res, next);
});

router.post("/loadMyInfo", async (req, res, next) => {
  try {
    const loginUser = await User.findOne({
      where: { id: req.user.id },
      attributes: {
        exclude: ["password"],
      },
    });

    return res.status(200).json(loginUser);
  } catch (error) {
    console.error(error);
    return res.status(400).send("로그인 유지를 실패하였습니다.");
  }
});

module.exports = router;
