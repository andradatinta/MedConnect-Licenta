const asyncHandler = require("express-async-handler");
const Event = require("../models/event");
exports.getCalendarEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 6;

  const events = await Event.find({})
    .skip(page * limit)
    .limit(limit);

  const totalFetchedEvents = await Event.countDocuments({});
  const calendarEventsData = {
    events,
    limit,
    page: page + 1,
    totalFetchedEvents,
  };
  res.status(200).json(calendarEventsData);

  if (!events) {
    res.status(400);
    throw new Error("No events to display");
  }
});
