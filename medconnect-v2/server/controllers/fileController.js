const File = require("../models/file");
const asyncHandler = require("express-async-handler");
const firebaseAdmin = require("firebase-admin");
const pdfParse = require("pdf-parse");
const { createWorker } = require("tesseract.js");
const axios = require("axios");

function analyzePdfText(text) {
  const match = text.match(/(\d+)\s+credite\s+EMC/i);
  if (match) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
}

exports.uploadFile = asyncHandler(async (req, res) => {
  const bucket = firebaseAdmin.storage().bucket();
  const fileBlob = bucket.file(`${req.user._id}/` + req.file.originalname);

  const blobStream = fileBlob.createWriteStream();
  blobStream.on("error", (err) => {
    throw new Error("Error uploading file to Firebase Storage: " + err);
  });

  blobStream.on("finish", async () => {
    try {
      const downloadURL = await fileBlob.getSignedUrl({
        action: "read",
        expires: "03-01-2500",
      });

      let text = "";
      let numCredits = 0;

      if (req.file.mimetype === "application/pdf") {
        let data;
        try {
          data = await pdfParse(req.file.buffer);
          text = data.text;
        } catch (error) {
          console.log("Error parsing the PDF", error);
        }

        if (text) {
          let credits;
          try {
            credits = analyzePdfText(text);
            console.log("Text analyzed successfully, credits:", credits);
            numCredits = credits || 0;
          } catch (error) {
            console.log("Error analyzing the text", error);
            throw error;
          }
        }
      }

      if (!numCredits || req.file.mimetype !== "application/pdf") {
        const response = await axios.get(downloadURL[0], {
          responseType: "arraybuffer",
        });
        const imageBuffer = Buffer.from(response.data, "binary");

        const worker = await createWorker({
          logger: (m) => console.log(m),
          langPath:
            "C:\\Users\\Dell\\Documents\\Facultate\\AN 3\\LICENTA\\medconnect-development\\MedConnect-Licenta\\medconnect-v2\\server\\tessdata",
        });

        await worker.loadLanguage("ron");
        await worker.initialize("ron");

        const {
          data: { text },
        } = await worker.recognize(imageBuffer);

        const creditsRegex = /(\d+)\scredite\sEMC/;
        const match = text.match(creditsRegex);
        if (match) {
          numCredits = Number(match[1]);
        }

        await worker.terminate();
      }

      const file = new File({
        filename: req.file.originalname,
        contentType: req.file.mimetype,
        owner: req.user._id,
        fileUrl: downloadURL[0],
        extractedCredits: numCredits,
      });
      await file.save();

      res.json({ success: true, downloadURL: downloadURL[0] });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Error processing file" });
    }
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

exports.getUserFiles = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 4;

  const files = await File.find({ owner: userId })
    .populate("owner", "firstName lastName")
    .sort({ uploadDate: -1 })
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
