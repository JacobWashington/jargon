const express = require("express");
const passport = require("../config/ppConfig");
const router = express.Router();


const db = require("../models");

router.get("/logout", (req, res) => {
  req.logOut(); 
  res.redirect("/");
});

router.post("/signup", (req, res) => {

  const { firstName, lastName, email, password } = req.body;
  db.user
    .findOrCreate({
      where: { email },
      defaults: { firstName, lastName, password },
    })
    .then(([user, created]) => {
      if (created) {
        console.log(`${user.firstName} was created....`);
        const successObject = {
          successRedirect: "/profile",
        };
        passport.authenticate("local", successObject)(req, res);
      } else {
        res.redirect("/#signup");
      }
    })
    .catch((error) => {
      console.log("**************Error");
      console.log(error);
      res.redirect("/#signup");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: '/profile',
    failureRedirect: '/#signup'
  })
);

module.exports = router;
