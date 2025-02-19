const asyncHandler = require("express-async-handler");
const Event = require("../models/event");
const User = require("../models/user");
const { specializations } = require("../util/constants");

exports.getCalendarEvents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 6;
  let sortType = req.query.sort || "local";
  let specialization = req.query.specialization || "All";
  let month = req.query.month || "All";

  const monthNumberMapping = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  specialization === "All"
    ? (specialization = [...specializations])
    : (specialization = req.query.specialization.split(","));

  month === "All"
    ? (month = Object.values(monthNumberMapping))
    : (month = req.query.month
        .split(",")
        .map((monthName) => monthNumberMapping[monthName]));

  const events = await Event.find({
    specialization: { $in: [...specialization] },
    sortType: sortType,
    $expr: { $in: [{ $month: "$dateTime" }, month] },
    dateTime: { $gte: new Date() },
  })
    .sort({ dateTime: 1 })
    .skip(page * limit)
    .limit(limit);

  const totalFetchedEvents = await Event.countDocuments({
    specialization: { $in: [...specialization] },
    sortType: sortType,
    $expr: { $in: [{ $month: "$dateTime" }, month] },
    dateTime: { $gte: new Date() },
  });
  const calendarEventsData = {
    events,
    limit,
    page: page + 1,
    totalFetchedEvents,
    specializations: specializations,
  };
  if (!events) {
    res.status(400);
    throw new Error("No events to display");
  }
  res.status(200).json(calendarEventsData);
});

exports.getRecentEvents = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const currentDate = new Date();

  const events = await Event.find({
    _id: { $in: user.signedUpEvents },
    dateTime: { $lt: currentDate },
  })
    .sort({ dateTime: -1 })
    .limit(4);

  res.status(200).json(events);
});

exports.getUpcomingEvents = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 6;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const currentDateTime = new Date();

  const upcomingEvents = await Event.find({
    _id: { $in: user.signedUpEvents },
    dateTime: { $gte: currentDateTime },
  })
    .skip(page * limit)
    .limit(limit);

  const totalFetchedUpcomingEvents = await Event.countDocuments({
    _id: { $in: user.signedUpEvents },
    dateTime: { $gte: currentDateTime },
  });
  const upcomingEventsData = {
    upcomingEvents,
    limit,
    page: page + 1,
    totalFetchedUpcomingEvents,
  };
  res.status(200).json(upcomingEventsData);

  if (!upcomingEvents) {
    res.status(404);
    throw new Error("No upcoming events found");
  }
});
