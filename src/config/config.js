const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_DBHOST }  = require("./serverConfig");


module.exports = {
  "development": {
    "username": MYSQL_USERNAME,
    "password": MYSQL_PASSWORD,
    "database": MYSQL_DATABASE,
    "host": MYSQL_DBHOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
