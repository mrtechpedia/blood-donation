const mongoose = require("mongoose");
const { Schema } = mongoose;

const dummySchema = new Schema({
  receiverName: String,
  mobile: Number,
  bloodGroup: String,
  hospital: String,
  units: Number,
  location: String,
});

mongoose.model("dummies", dummySchema);
