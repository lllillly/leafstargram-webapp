const Sequelize = require("sequelize");
const teaminfo = require("./teaminfo");
const user = require("./user");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
// config 에서 컨피그 파일에서 디벨롭먼트 혹은 프로덕션을 가져오고 그 엔브 값까지 가져온당...?

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.TeamInfo = teaminfo;
db.User = user;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
