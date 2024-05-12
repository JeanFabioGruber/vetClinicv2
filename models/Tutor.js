const Sequelize = require("sequelize");
const db = require(process.env.modeloPetAndTurotssDb);

const Tutor = db.define("tutors", {
  name: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.STRING,
  },
  zipCode: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Tutor;
