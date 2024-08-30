const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("Connection failed!", error);
  });