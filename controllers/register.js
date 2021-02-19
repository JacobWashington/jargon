const express = require('express');
const router = express.Router();
const db = require('../models')

router.get("/", (req, res) => {
  res.render('partials/register')
})

router.post("/", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    db.user
    .findOrCreate({
      where: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    })
    .then((user) => {
      db.profile
        .create({
          headline: "",
          about: "",
          experience: "",
          userId: user[0].dataValues.id
        })
        .then((profile) => {
          console.log(user, profile)
          res.status(200)
          console.log('GREAT SUCCESS')
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((e) => {
      console.log(e);
    });
  });

module.exports = router;