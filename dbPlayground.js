// const express = require("express");
// const db = require("./models");

// db.registeredUser
//   .findOrCreate({
//     where: {
//       firstName: "Jacob",
//       lastName: "Washington",
//       email: "example@email.com",
//       hashedPwd: "password",
//     },
//   })
//   .then(function ([user, created]) {
//     console.log(["*****USER*******"], user);
//     db.userprofile
//       .create({
//         employer: "Apple",
//         headline: `I'm a software developer!`,
//         about: `This is a section all about me!`,
//         experience: `This is where I'll tell you about my relevant work experience!`,
//       })
//       .then(function ([profile, created]) {
//         console.log(["*****PROFILE*******"], profile);
//         user.addUserprofile(profile).then(function (relationInfo) {
//           console.log(profile, "added to", user.firstName);
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });