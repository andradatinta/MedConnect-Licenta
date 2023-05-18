const asyncHandler = require("express-async-handler");
const Event = require("../models/event");
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
