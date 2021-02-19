const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models");

router.get("/register", (req, res) => {
  res.render("partials/register");
});

router.get("/login", (req, res) => {
  console.log("*****************GET LOGIN******************", req.body);
  db.profile
    .create({
      headline: "",
      about: "",
      experience: "",
      userId: "23",
    })
    .then((profile) => {
      console.log(profile);
      res.render("/profile");
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post("/logout", (req, res) => {
  req.logOut();
  req.flash("success", "Logging out... See you next time!");
  res.redirect("/");
});

router.post("/register", (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  db.user
    .findOrCreate({
      where: { email },
      defaults: { firstName, lastName, password },
    })
    .then(([user, created]) => {
      if (created) {
        console.log("*********************", user);
        const successObject = {
          successRedirect: { route: "/auth/login", user: user },
          successFlash: `Welcome ${user.name}. Account was created and logging in...`,
        };
        passport.authenticate("local", successObject)(req, res);
      } else {
        req.flash("error", "Email already exists");
        res.redirect("/auth/register");
      }
    })
    .catch((error) => {
      console.log("**************Error");
      console.log(error);
      req.flash(
        "error",
        "Either email or password is incorrect. Please try again."
      );
      res.redirect("/auth/register");
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome back ...",
    failureFlash: "Either email or password is incorrect",
  })
);

module.exports = router;
