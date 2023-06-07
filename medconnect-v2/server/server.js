const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const firebaseAdmin = require("firebase-admin");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client/public")));
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const port = process.env.PORT || 5000;

const serviceAccount = require("./serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  storageBucket: "medconnect-26600.appspot.com",
});

app.use(cors(corsOptions));

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use(errorHandler);

// app.listen(port);

mongoose
  .connect(
    "mongodb+srv://andradatinta:25072001@cluster0.i0fvo4n.mongodb.net/medconnect?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

console.log("App is listening on port " + port);
