require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
// const passport = require('./config/ppConfig'); //
const flash = require("connect-flash");
const axios = require("axios");
const controllers = require("./controllers");

const app = express();
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

// Session Middleware

//move to GET Route w/signin
let newsObj;
axios
  .get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&sources=cnn,bbc&languages=en&categories=technology,science`
  )
  .then((obj) => {
    newsObj = obj.data;
  });

//routes
app.use("/register", controllers.register);

app.get("/", (req, res) => {
  res.render("landingPage");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
