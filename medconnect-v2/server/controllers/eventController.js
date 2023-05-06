const asyncHandler = require("express-async-handler");
const Event = require("../models/event");
exports.getCalendarEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.status(200).json(events);
  if (!events) {
    res.status(400);
    throw new Error("No events to display");
  }
});
