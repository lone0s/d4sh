const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:wasssql@localhost:5432/d4sh",
  {
    host: "localhost",
    dialect: "postgres",
  },
);
module.exports = sequelize;