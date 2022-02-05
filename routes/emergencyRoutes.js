const mongoose = require("mongoose");
const e = require("express");

const Receiver = mongoose.model("receivers");

module.exports = (app) => {
  app.post("/api/emergency", async (req, res, done) => {
    const newReceiver = await new Receiver({
      receiverName: req.body.receiverName,
      mobile: req.body.mobile,
      bloodGroup: req.body.bloodGroup,
      hospital: req.body.hospital,
      units: req.body.units,
      location: req.body.location,
    }).save();
    return res.json({ msg: "Request sent successfully!!" });
  });
};
