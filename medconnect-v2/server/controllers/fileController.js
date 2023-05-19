const File = require("../models/file");
const asyncHandler = require("express-async-handler");
const { gfs } = require("../middleware/multerConfig");

exports.uploadFile = asyncHandler(async (req, res) => {
  // This function should handle uploading the file with Multer and GridFS,
  // then creating a new File document with the relevant metadata.
  res.json({ file: req.file });
});

exports.getFile = asyncHandler(async (req, res) => {
  gfs.files.findOne({ _id: req.params.id }, (err, file) => {
    if (err || !file) {
      return res.status(404).json({ err: "File not found" });
    }

    const downloadStream = bucket.openDownloadStream(req.params.id);
    downloadStream.pipe(res);
  });
});
