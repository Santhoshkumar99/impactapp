const express = require("express");
const router = express.Router();
const appController = require("../controller/app.controller");
const upload = require("../middleware/multer");

let routes = (app) => {
  router.post("/upload", upload.single("file"), appController.upload);
  router.get("/reports", appController.getReports);
  router.get("/report/:id?", appController.getReportById);

  app.use("/api/v1", router);
};

module.exports = routes;