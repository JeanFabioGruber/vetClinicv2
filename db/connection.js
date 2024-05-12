const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.storegeA,
});

module.exports = sequelize;
