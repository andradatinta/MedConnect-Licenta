const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      username: "Andrada",
      age: 21,
    },
    {
      username: "Melina",
      age: 17,
    },
  ]);
});

module.exports = router;
