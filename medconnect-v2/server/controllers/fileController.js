const File = require("../models/file");
const asyncHandler = require("express-async-handler");
const { gfs } = require("../middleware/multerConfig");
const firebaseAdmin = require("firebase-admin");
const pdfParse = require("pdf-parse");

function analyzePdfText(text) {
  const match = text.match(/(\d+)\s+credite\s+EMC/i);
  if (match) {
    return parseInt(match[1], 10); // Convert the matched credits to a number
  } else {
    return null; // Or some default value, if no credits were found
  }
}
// functie upload inainte de pdf parser

// exports.uploadFile = asyncHandler(async (req, res) => {
//   // Upload the file to Firebase Storage
//   const bucket = firebaseAdmin.storage().bucket();
//   const fileBlob = bucket.file(`${req.user._id}/` + req.file.originalname);
//   console.log(req.file.id + ".pdf");
//   const blobStream = fileBlob.createWriteStream();
//   blobStream.on("error", (err) => {
//     throw new Error("Error uploading file to Firebase Storage: " + err);
//   });
//   blobStream.on("finish", async () => {
//     const downloadURL = await fileBlob.getSignedUrl({
//       action: "read",
//       expires: "03-01-2500", // Adjust the expiration date as needed
//     });

//     const file = new File({
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//       owner: req.user._id,
//       fileUrl: downloadURL[0],
//     });

//     console.log("File uploaded successfully!");
//     console.log("Download URL:", downloadURL[0]);

//     res.json({ success: true, downloadURL: downloadURL[0] });

//     // Save the file metadata to MongoDB
//     await file.save();
//   });
//   blobStream.end(req.file.buffer);
// });

// exports.getFile = asyncHandler(async (req, res) => {
//   const fileId = req.params.id;

//   try {
//     const file = await File.findById(fileId);
//     if (!file) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     res.json({ fileUrl: file.fileUrl });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

exports.uploadFile = asyncHandler(async (req, res) => {
  // Upload the file to Firebase Storage
  const bucket = firebaseAdmin.storage().bucket();
  const fileBlob = bucket.file(`${req.user._id}/` + req.file.originalname);
  console.log(req.file.id + ".pdf");
  const blobStream = fileBlob.createWriteStream();
  blobStream.on("error", (err) => {
    throw new Error("Error uploading file to Firebase Storage: " + err);
  });
  blobStream.on("finish", async () => {
    const downloadURL = await fileBlob.getSignedUrl({
      action: "read",
      expires: "03-01-2500", // Adjust the expiration date as needed
    });
    // Parse the PDF
    let data;
    try {
      data = await pdfParse(req.file.buffer);
      console.log("PDF parsed successfully");
    } catch (error) {
      console.log("Error parsing the PDF", error);
      throw error;
    }

    // Analyze the text
    let credits;
    try {
      console.log("uite textul: ", data.text);
      credits = analyzePdfText(data.text);
      console.log("Text analyzed successfully, credits:", credits);
    } catch (error) {
      console.log("Error analyzing the text", error);
      throw error;
    }

    const file = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      owner: req.user._id,
      fileUrl: downloadURL[0],
      extractedCredits: credits,
    });

    console.log("File uploaded successfully!");
    console.log("Download URL:", downloadURL[0]);

    res.json({ success: true, downloadURL: downloadURL[0] });

    // Save the file metadata to MongoDB
    await file.save();
  });
  blobStream.end(req.file.buffer);
});

exports.getFile = asyncHandler(async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.json({ fileUrl: file.fileUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// exports.getUserFiles = asyncHandler(async (req, res) => {
//   const user = req.user;
//   const page = parseInt(req.query.page) - 1 || 0;
//   const limit = parseInt(req.query.limit) || 4;

//   const files = await File.find({ owner: user._id })
//     .populate("owner", "firstName lastName")
//     .skip(page * limit)
//     .limit(limit);

//   const totalFetchedFiles = await File.countDocuments({ owner: user._id });

//   const userFilesData = {
//     files,
//     limit,
//     page: page + 1,
//     totalFetchedFiles,
//   };

//   if (files) {
//     res.status(200).json(userFilesData);
//   } else {
//     res.status(404);
//     throw new Error("Files not found");
//   }
// });

exports.getUserFiles = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 4;

  const files = await File.find({ owner: userId })
    .populate("owner", "firstName lastName")
    .skip(page * limit)
    .limit(limit);

  const totalFetchedFiles = await File.countDocuments({ owner: userId });

  const userFilesData = {
    files,
    limit,
    page: page + 1,
    totalFetchedFiles,
  };

  if (files) {
    res.status(200).json(userFilesData);
  } else {
    res.status(404);
    throw new Error("Files not found");
  }
});

exports.updateFileValidation = asyncHandler(async (req, res) => {
  const fileId = req.params.id;
  const { validated, validationDate } = req.body;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    file.validated = validated;
    file.validationDate = validationDate;
    await file.save();

    res.json({ message: "File validation updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
