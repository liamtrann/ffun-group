const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const url =
  "postgres://bjtjfrtq:qUrOVmcBYzMkEUbHVCcH0O8iNSwQFHgB@suleiman.db.elephantsql.com/bjtjfrtq";

const sequelize = new Sequelize(process.env.URL_DATABASE || url, {
  dialect: "postgres",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car = require("./car.model.js")(sequelize, Sequelize);

module.exports = db;
