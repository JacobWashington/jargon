const express = require("express");
const db = require("./models");
const axios = require("axios");
require("dotenv").config();
db.user
  .findOrCreate({
    where: {
      firstName: "Jacob",
      lastName: "Washington",
      email: "example1@email.com",
      password: "password",
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
        console.log(profile)
      })
      .catch((e) => {
        console.log(e);
      });
  })
  .catch((e) => {
    console.log(e);
  });

//NEWS API
// axios
//   .get(
//     `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&sources=cnn,bbc&languages=en&categories=technology,science`
//   )
//   .then((obj) => {
//     console.log(obj.data);
//   });
