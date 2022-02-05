const mongoose = require("mongoose");
const { Schema } = mongoose;

const donorSchema = new Schema({
  username: String,
  mobile: Number,
  email: String,
  address: String,
  designation: String,
  ldo: Date,
  dob: Date,
  bloodGroup: String,
  college: String,
  chronicDisease: String,
});

mongoose.model("donors", donorSchema);
