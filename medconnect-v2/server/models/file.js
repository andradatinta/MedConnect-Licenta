const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  // fileId: { type: String, required: true }, // ID of the actual file in GridFS or external storage
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // Reference to the associated Event (if applicable)
  uploadDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  extractedCredits: { type: Number }, // Store the credits extracted from the diploma
  fileUrl: { type: String, required: true },
});

module.exports = mongoose.model("File", fileSchema);
