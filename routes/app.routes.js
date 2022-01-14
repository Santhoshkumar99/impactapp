const express = require("express");
const router = express.Router();
const appController = require("../controller/app.controller");
const upload = require("../middleware/multer");

let routes = (app) => {
  // Upload student result CSV file API route
  router.post("/upload", upload.single("file"), appController.upload);

  // Get passed or failed student by passing Query string API route
  router.get("/students", appController.getReports);

  //Get result of particular Student by ID API route
  router.get("/student/:id?", appController.getReportById);

  app.use("/api/v1", router);
};

module.exports = routes;
