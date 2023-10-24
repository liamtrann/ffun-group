module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    no: {
      type: Sequelize.INTEGER,
    },
    make: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    status: {
      type: Sequelize.ENUM,
      values: ["live", "sold"],
    },
  });

  return Car;
};
