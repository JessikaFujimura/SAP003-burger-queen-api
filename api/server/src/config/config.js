require('dotenv').config();

module.exports = {
  "development": {
    "username": "postgres",
    "password": null,
    "database": "bq_development",
    "host": "db",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "bq_test",
    "host": "db",
    "dialect": "postgres",
    "operatorsAliases": 0
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "operatorsAliases": 0,
    "dialectOptions": {
      "ssl": true
    }
  }
}
