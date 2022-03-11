const mongoose = require("mongoose");
const keys = require("../config/keys");
const e = require("express");
const csvFilePath = "sample.csv";
const csv = require("csvtojson");

const Donor = mongoose.model("donors");
const Receiver = mongoose.model("receivers");

module.exports = (app) => {
  app.post("/api/admin", async (req, res, done) => {
    let foundDonors = {};

    if (req.body.bloodGroup && req.body.citySearch) {
      foundDonors = await Donor.find({
        bloodGroup: req.body.bloodGroup,
        city: req.body.citySearch,
      });
    } else if (req.body.bloodGroup) {
      foundDonors = await Donor.find({
        bloodGroup: req.body.bloodGroup,
      });
    } else if (req.body.citySearch) {
      foundDonors = await Donor.find({
        city: req.body.citySearch,
      });
    }

    if (foundDonors.length != 0) {
      return res.json({
        donors: foundDonors,
      });
    }

    return res.json({
      msg: "No donors found!!",
      donors: null,
    });
  });

  // app.get("/api/notification", async (req, res, done) => {
  //   const jsonArray = await csv().fromFile(csvFilePath);
  //   console.log(jsonArray);
  //   Donor.insertMany(jsonArray, (err, result) => {
  //     if (err) console.log(err);
  //     if (result) {
  //       console.log("Import CSV into database successfully");
  //     }
  //   });
  // });

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

  app.get("/api/city", async (req, res, done) => {
    const foundDonors = await Donor.find();
    return res.json({
      donors: foundDonors,
    });
  });

  app.post("/api/delete", async (req, res) => {
    const id = req.body.idNo;
    const isDeleted = await Receiver.deleteOne({ _id: id });
    return res.json({
      count: isDeleted.deletedCount,
    });
  });
};
