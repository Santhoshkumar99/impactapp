const db = require("../model");
const Report = db.reports;

const fs = require("fs");
const csv = require("fast-csv");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).json({
        status: false,
        message: "Please upload a CSV file!",
      });
    }

    let arrReports = [];
    let path = __basedir + "/resources/" + req.file.filename;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        arrReports.push(row);
      })
      .on("end", () => {
        Report.bulkCreate(arrReports)
          .then(() => {
            res.status(200).json({
              status: true,
              message:
                "Uploaded the file successfully: " + req.file.originalname,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: false,
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getReports = (req, res) => {
  Report.findAll({
    raw: true,
  })
    .then((data) => {
      data.forEach(function (v) {
        v.totalMarks = v.mark1 + v.mark2 + v.mark3;
        if (v.totalMarks >= 250) {
          v.resultStatus = "passed";
        } else {
          v.resultStatus = "failed";
        }
      });
      const filteredUsers = data.filter((item) => {
        return item.resultStatus == req.query.resultStatus;
      });
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "No records found",
        });
      }
      res.status(200).json(filteredUsers);
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: err.message || "Some error occurred while retrieving Report.",
      });
    });
};

const getReportById = (req, res) => {
  Report.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: false,
          message: "No record found with this ID =" + req.params.id,
        });
      }
      data = data.toJSON();
      data.total = data.mark1 + data.mark2 + data.mark3;
      data.average = (data.mark1 + data.mark2 + data.mark3) / 3;
      res.status(200).json({
        status: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Report.",
      });
    });
};

module.exports = {
  upload,
  getReports,
  getReportById,
};
