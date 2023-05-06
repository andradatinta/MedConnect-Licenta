const express = require("express");

const eventsController = require("../controllers/eventController");

const router = express.Router();

router.get("/getCalendar", eventsController.getCalendarEvents);

module.exports = router;
