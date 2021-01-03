const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

app.use(express.json());
app.use(express.static("public"));
app.use(helmet("common"));
app.use(
  cors({
    origin: true,
  })
);

connectDB();
app.get("/", (req, res) => {
  res.send("hello");
});

//Template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
