const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const { upload } = require("../middleware/multerConfig");
const routeProtect = require("../middleware/authMiddleware");

router.post(
  "/upload",
  routeProtect,
  upload.single("file"),
  fileController.uploadFile
);
// 'file' is the name of the field in my upload form - formData logic in the handleFileUpload fe function
router.get("/file/:id", fileController.getFile);
router.get("/getUserFiles/:userId", fileController.getUserFiles);
router.put("/:id", routeProtect, fileController.updateFileValidation);

module.exports = router;
