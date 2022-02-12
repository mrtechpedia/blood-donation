const mongoose = require("mongoose");
const e = require("express");

const Receiver = mongoose.model("receivers");
const ReceiverDummy = mongoose.model("dummies");

module.exports = (app) => {
  app.post("/api/emergency", async (req, res, done) => {
    const body = {
      receiverName: req.body.receiverName,
      mobile: req.body.mobile,
      bloodGroup: req.body.bloodGroup,
      hospital: req.body.hospital,
      units: req.body.units,
      location: req.body.location,
    };

    await new Receiver(body).save();

    await new ReceiverDummy(body).save();

    return res.json({ msg: "Request sent successfully!!" });
  });
};
