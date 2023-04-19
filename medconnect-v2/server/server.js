const express = require("express");
const cors = require("cors");
const path = require("path");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const mongoConnect = require("./util/database");

const app = express();
app.use(express.static(path.join(__dirname, "client/build")));
const eventRoutes = require("./routes/events");

app.use(cors(corsOptions));

app.use("/api/event", eventRoutes);

const port = process.env.PORT || 5000;
// app.listen(port);
mongoConnect((client) => {
  console.log(client);
  app.listen(port);
});

console.log("App is listening on port " + port);
