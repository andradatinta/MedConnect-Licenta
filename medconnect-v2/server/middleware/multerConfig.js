const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

// Create a GridFS Bucket
const conn = mongoose.connection;
let bucket;
conn.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

// Create a GridFS storage engine for Multer
const storage = new GridFsStorage({
  url: "mongodb+srv://andradatinta:25072001@cluster0.i0fvo4n.mongodb.net/medconnect?retryWrites=true&w=majority",
  file: (req, file) => {
    return {
      bucketName: "uploads", // the collection name
      filename: `${file.originalname}-${Date.now()}`, // the filename
    };
  },
});

const upload = multer({ storage });

module.exports = { upload, bucket };
