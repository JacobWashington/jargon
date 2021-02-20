require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require('./config/ppConfig');
const flash = require("connect-flash");
const axios = require("axios");
const controllers = require("./controllers");

const app = express();
app.set("view engine", "ejs");

const SECRET_SESSION = process.env.SECRET_SESSION;
const isLoggedIn = require('./middleware/isLoggedIn');

// MIDDLEWARE
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(layouts);

// Session Middleware

const sessionObject = {
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionObject));
// Passport
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Add a session
// Flash 
app.use(flash());
app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//move to GET Route w/signin
let newsObj;
axios
  .get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&sources=cnn,bbc&languages=en&categories=technology,science`
  )
  .then((obj) => {
    newsObj = obj.data;
  });

//controllers
app.use("/auth", require('./controllers/auth'));

app.get("/", (req, res) => {
  res.render("landingPage");
});

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;