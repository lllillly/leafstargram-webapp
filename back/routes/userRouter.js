const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const passport = require("passport");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // post는 데이터가 body에 들어옴
  const { email, password, nickname, birth } = req.body;

  const hashPassword = await bcrypt.hash(password, 12);
  // password 뒤의 12는 보안의 강도
  // hash는 암호화임을 표시하는 것

  try {
    const exUser = await User.findOne({
      where: { email },
    });

    if (exUser) {
      return res.status(403).send("이미 가입된 이메일입니다.");
      // 여기서 리턴되면 아래 코드까지 내려가지 않음
    }

    await User.create({
      email,
      nickname,
      password: hashPassword,
      birth,
    });

    return res.status(201).json({ result: true });
  } catch (e) {
    console.error(e);
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
        console.log("❌ Login Error");
        console.error(loginErr);
        return next(loginErr);
      }
      const withOutPasswordUser = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
      });

      // 유저가 피드를 가질 수 있는데, 나중에 피드도 같이 갖고오게 하는것.
      return res.status(200).json(withOutPasswordUser);
    });
  })(req, res, next); // 선언이 되면서 동시에 실행이 된다.
});

router.post("/loadMyInfo", async (req, res, next) => {
  console.log(req.user.id);

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

// 함수 안에 콜백 안에 콜백 }) }) })

module.exports = router;
