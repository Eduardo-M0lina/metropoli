const dotenv = require("dotenv");

dotenv.config();

const bdConfig = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USERNAME,
  password: process.env.PASSWORD
};

module.exports = {
  bdConfig
};
