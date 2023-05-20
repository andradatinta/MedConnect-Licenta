const File = require("../models/file");
const asyncHandler = require("express-async-handler");
const { gfs } = require("../middleware/multerConfig");

exports.uploadFile = asyncHandler(async (req, res) => {
  // Assuming req.file and req.user are already populated by the multer middleware and your user authentication middleware, respectively
  const file = new File({
    filename: req.file.filename,
    contentType: req.file.mimetype,
    fileId: req.file.id, // or req.file.filename, depending on how you want to locate the file later
    owner: req.user._id, // assuming you have a user authentication middleware that assigns the authenticated user to req.user
    // event: <event_id>, // if applicable
    // uploadDate will be set to the current time by default
  });

  await file.save();
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
