const mongoose = require("mongoose");
const Event = require("./models/event");
const { events } = require("./util/constants");

const MONGODB_URI =
  "mongodb+srv://andradatinta:25072001@cluster0.i0fvo4n.mongodb.net/medconnect?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const events = [
//   {
//     name: "Actualități in pediatrie",
//     description: "Description for Event 1",
//     location: "Location for Event 1",
//     dateTime: new Date("2023-05-10T10:00:00"),
//     contactEmail: "event1@example.com",
//     specialization: "Pediatrie",
//     credits: 12,
//   },
//   {
//     name: "Congresul National de Medicina Fetala si Neonatala",
//     description: "Description for Event 1",
//     location: "Location for Event 1",
//     dateTime: new Date("2023-05-11T13:00:00"),
//     contactEmail: "event2@example.com",
//     specialization: "Neonatologie",
//     credits: 15,
//   },
//   // ... other event objects
// ];

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
