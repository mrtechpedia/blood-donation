const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/Donor");
require("./models/Receiver");

const app = express();
const cors = require("cors");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

require("./routes/authRoutes")(app);
require("./routes/adminRoutes")(app);
require("./routes/emergencyRoutes")(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT);
