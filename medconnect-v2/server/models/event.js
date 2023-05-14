const mongoose = require("mongoose");
const { specializations, eventSortType } = require("../util/constants");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  dateTime: { type: Date, required: true },
  contactEmail: { type: String, required: true },
  specialization: {
    type: [String],
    required: true,
    enum: specializations,
  },
  sortType: {
    type: String,
    enum: eventSortType,
    required: true,
  },
  imageUrl: { type: String, required: false },
  credits: { type: Number, required: true },
});

module.exports = mongoose.model("Event", eventSchema);
