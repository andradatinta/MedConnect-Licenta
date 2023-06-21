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
router.get("/file/:id", fileController.getFile);
router.get("/getUserFiles/:userId", fileController.getUserFiles);
router.put("/:id", routeProtect, fileController.updateFileValidation);

module.exports = router;
