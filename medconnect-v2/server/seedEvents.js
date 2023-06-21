const mongoose = require("mongoose");
const Event = require("./models/event");
const { events } = require("./util/constants");

const MONGODB_URI = process.env.MONGODB_KEY;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedEvents() {
  try {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log("Events seeded successfully!");
  } catch (err) {
    console.error("Error seeding events:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedEvents();
