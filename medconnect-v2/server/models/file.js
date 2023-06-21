const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  uploadDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  extractedCredits: { type: Number },
  fileUrl: { type: String, required: true },
  validationDate: { type: Date },
});

module.exports = mongoose.model("File", fileSchema);
