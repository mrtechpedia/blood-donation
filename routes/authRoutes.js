const mongoose = require("mongoose");
const keys = require("../config/keys");
const e = require("express");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const Donor = mongoose.model("donors");

module.exports = (app) => {
  app.post("/api/register", async (req, res, done) => {
    const existingDonor = await Donor.findOne({ email: req.body.email });
    if (existingDonor) {
      return res.json({
        msg: "You are already registered with us",
      });
    }
    const newDonor = await new Donor({
      username: req.body.username,
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      college: req.body.college,
      chronicDisease: req.body.chronicDisease,
      ldo: req.body.ldo,
      dob: req.body.dob,
      designation: req.body.designation,
      bloodGroup: req.body.bloodGroup,
    }).save();
    return res.json({ msg: "Registration successfull!!" });
  });

  // app.get("/api/login", async (req, res, done) => {
  //   const existingDonor = await Donor.findOne({
  //     email: req.body.email,
  //   });
  //   if (existingDonor) {
  //     bcrypt.compare(
  //       req.body.password,
  //       existingDonor.password,
  //       async (err, result) => {
  //         if (result)
  //           return res.json({
  //             msg: "Login successful",
  //             donor: existingDonor,
  //           });
  //         else {
  //           return res.json({
  //             msg: "Incorrect password",
  //             donor: null,
  //           });
  //         }
  //       }
  //     );
  //   } else {
  //     return res.json({
  //       msg: "You are not registered with us, please register!!",
  //       donor: null,
  //     });
  //   }
  // });
};
