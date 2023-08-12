const dotenv = require('dotenv');

const bcrypt = require("bcrypt");

dotenv.config();


module.exports = {
    PORT : process.env.PORT,
    SALT : bcrypt.genSaltSync(9),
    JWT_KEY: process.env.JWT_KEY,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_USERNAME: process.env.MYSQL_USERNAME,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DBHOST: process.env.MYSQL_DBHOST
}