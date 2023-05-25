const asyncHandler = require("express-async-handler");
const Event = require("../models/event");
const User = require("../models/user");
const { specializations, eventSortType } = require("../util/constants");

exports.getCalendarEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 6;
  // const sort = req.query.sort || "local";
  let specialization = req.query.specialization || "All";

  specialization === "All"
    ? (specialization = [...specializations])
    : (specialization = req.query.specialization.split(","));
  // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  // let sortBy = {};
  // if (sort[1]) {
  // 	sortBy[sort[0]] = sort[1];
  // } else {
  // 	sortBy[sort[0]] = "asc";
  // }
  const events = await Event.find({})
    .where("specialization")
    .in([...specialization])
    .skip(page * limit)
    .limit(limit);

  const totalFetchedEvents = await Event.countDocuments({
    specialization: { $in: [...specialization] },
  });
  const calendarEventsData = {
    events,
    limit,
    page: page + 1,
    totalFetchedEvents,
    specializations: specializations,
  };
  res.status(200).json(calendarEventsData);

  if (!events) {
    res.status(400);
    throw new Error("No events to display");
  }
});

exports.getRecentEvents = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Find the user
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Get the current date
  const currentDate = new Date();

  // Find the events that the user signed up for and that have already occurred
  const events = await Event.find({
    _id: { $in: user.signedUpEvents },
    dateTime: { $lt: currentDate },
  })
    .sort({ dateTime: -1 }) // sort in descending order to get the most recent events
    .limit(4); // get only the 5 most recent events for example

  res.status(200).json(events);
});

exports.getUpcomingEvents = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const currentDateTime = new Date();

  const upcomingEvents = await Event.find({
    _id: { $in: user.signedUpEvents },
    dateTime: { $gte: currentDateTime },
  });

  if (!upcomingEvents) {
    res.status(404);
    throw new Error("No upcoming events found");
  }

  res.status(200).json(upcomingEvents);
});
