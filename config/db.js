const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });
  const connection = mongoose.connection;

  connection.on("error", (error) => {
    console.log(error);
  });

  connection.once("open", () => {
    console.log("Database connection established.");
  });
}

module.exports = connectDB;
