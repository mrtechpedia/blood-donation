const mongoose = require("mongoose");
const keys = require("../config/keys");
const e = require("express");
const Donor = mongoose.model("donors");
const Receiver = mongoose.model("receivers");

module.exports = (app) => {
  app.post("/api/admin", async (req, res, done) => {
    const foundDonors = await Donor.find({ bloodGroup: req.body.bloodGroup });

    if (foundDonors.length != 0) {
      return res.json({
        msg: "Donors found with " + req.body.bloodGroup + "are...",
        donors: foundDonors,
      });
    }

    return res.json({
      msg: "No donors found with " + req.body.bloodGroup + " blood group",
      donors: null,
    });
  });

  app.get("/api/notification", async (req, res, done) => {
    const foundNotification = await Receiver.find();

    if (foundNotification.length != 0) {
      return res.json({
        msg: "Notifications found are...",
        notification: foundNotification,
      });
    }

    return res.json({
      msg: "No new notifications...",
      notification: null,
    });
  });

  // app.get("/api/city", async (req, res, done) => {
  //   const foundDonors = await Donor.find();

  //   if (foundDonors.length != 0) {
  //     return res.json({
  //       msg: "Cities found are...",
  //       city: foundDonors.city,
  //     });
  //   }

  //   return res.json({
  //     msg: "No new notifications...",
  //     notification: null,
  //   });
  // });

  app.post("/api/delete", async (req, res) => {
    const id = req.body.idNo;
    const isDeleted = await Receiver.deleteOne({ _id: id });
    return res.json({
      count: isDeleted.deletedCount,
    });
  });
};
