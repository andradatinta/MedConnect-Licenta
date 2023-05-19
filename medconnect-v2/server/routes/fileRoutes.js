const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const { upload } = require("../middleware/multerConfig");

router.post("/upload", upload.single("file"), fileController.uploadFile);
// 'file' is the name of the field in my upload form - formData logic in the handleFileUpload fe function
router.get("/file/:id", fileController.getFile);

module.exports = router;
