const express = require("express");
const app = express();
const mongoose = require("mongoose");
const urlRoutes = require("./Routes/urlRoutes");
const userRoutes = require("./Routes/userRoutes");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

// const Urls = require("./Models/url");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
require("dotenv").config();

app.use("/", urlRoutes);
app.use("/user", userRoutes);

const posts = {
  1: {
    id: "1",
    title: "Hello World",
    body: "Welcome to my blog",
  },
  2: {
    id: "2",
    title: "My favorite food",
    body: "Pizza",
  },
};

app.use("/posts", (req, res, next) => {
  res.json(posts);
});

mongoose
  .connect("mongodb://localhost/urls_shortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Could not connect to MongoDB");
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
