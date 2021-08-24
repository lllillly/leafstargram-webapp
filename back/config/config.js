const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.MYSQL_USERNAME_PROD,
    password: process.env.MYSQL_PASSWORD_PROD,
    database: process.env.MYSQL_DBNAME_PROD,
    host: process.env.MYSQL_DBHOST_PROD,
    dialect: "mysql",
  },
};
