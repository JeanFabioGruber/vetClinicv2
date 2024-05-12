const Sequelize = require("sequelize");
const db = require(process.env.modeloPetAndTurotssDb);

const Pet = db.define("pets", {
  name: {
    type: Sequelize.STRING,
  },
  species: {
    type: Sequelize.STRING,
  },
  carry: {
    type: Sequelize.STRING,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  dateOfBirth: {
    type: Sequelize.STRING,
  },
  tutorId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Pet;
