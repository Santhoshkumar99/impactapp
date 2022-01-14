module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "qwerty",
  DB: "student_result",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
