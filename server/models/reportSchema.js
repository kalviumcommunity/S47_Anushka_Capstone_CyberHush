const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  reportType: String,
  description: String,
  date: Date,
  location: String,
  image: String,
  status: String,
});

const report = mongoose.model("reports", reportSchema);
module.exports = report;
