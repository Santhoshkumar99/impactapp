const express = require("express");
var cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const db = require("./model");
const initRoutes = require("./routes/app.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

global.__basedir = __dirname + "";
initRoutes(app);

db.sequelize.sync();

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: "Invalid url",
    message: error.message,
  });
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});
