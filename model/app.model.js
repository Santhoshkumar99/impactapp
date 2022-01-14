module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("studentresult", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    age: {
      type: Sequelize.INTEGER,
    },
    mark1: {
      type: Sequelize.INTEGER,
    },
    mark2: {
      type: Sequelize.INTEGER,
    },
    mark3: {
      type: Sequelize.INTEGER,
    },
  });

  return Report;
};
