const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

// index에서 생성하는 것
// passport의 기능 중 시리얼라이즈와 디시리얼라이즈를 정의해줌
// 시리얼라이즈 : id만 조회
// 디시리얼라이즈 : id로 모든 정보 조회

module.exports = () => {
  passport.serializeUser((user, done) => {
    // 첫번째 인자는 서버 에러, 두번째 인자는 성공 시 데이터
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: id });

      done(null, user);
    } catch (e) {
      console.log("❌ Passport - deserializeUser Error!");
      console.error(e);
    }
  });

  local();
};
