const express = require("express");
const asyncHandler = require("express-async-handler");

const eventsController = require("../controllers/events");

const router = express.Router();

router.get("/", eventsController.getEvents);

module.exports = router;
