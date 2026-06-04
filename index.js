const mongoose = require("mongoose");
const app = require("./app.js");

mongoose
  .connect(
    "mongodb+srv://mohammad65487:P4ygMjdirvQz5eXy@cluster0.c400hrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
