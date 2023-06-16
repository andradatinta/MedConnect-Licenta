const express = require("express");

const eventsController = require("../controllers/eventController");
const routeProtect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/calendar", eventsController.getCalendarEvents);
router.get("/recent", routeProtect, eventsController.getRecentEvents);
router.get("/upcoming", routeProtect, eventsController.getUpcomingEvents);

module.exports = router;
