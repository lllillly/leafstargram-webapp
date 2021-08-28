const express = require("express");

const router = express.Router();

router.post("/signup", async (req, res) => {
  // post는 데이터가 body에 들어옴
  const { email, password, nickname, birth } = req.body;

  console.log(email);
  console.log(password);
  console.log(nickname);
  console.log(birth);
});

module.exports = router;
