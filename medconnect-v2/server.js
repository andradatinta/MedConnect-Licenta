const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

const users = require("./users"); // aici ar trebui sa am user routes abis si sa mi fac request urile catre api pe diferite rute in functie
// de cum le apelez din front cu fetch/axios

app.use(cors(corsOptions)); // Use this after the variable declaration

app.use("/api/users", users);
// app.get("/api", (req, res) => {
//   res.send("salut buna");
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
