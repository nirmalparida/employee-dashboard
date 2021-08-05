const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("../backend/routes/user");
const app = express();

mongoose
  .connect(
    "mongodb+srv://user_test:" +
      process.env.MONGO_ATLAS_PW +
      "@nirmal.ydhpa.mongodb.net/node-angular",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch(() => {
    console.log("Error occured while connecting database");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/user", userRoutes);

module.exports = app;
