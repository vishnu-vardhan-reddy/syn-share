const File = require("./models/schema");
const fs = require("fs");
const connectDB = require("./config/db");

connectDB();

async function fetchData() {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`Successfully Deleted ${file.filename}`);
      } catch (error) {
        console.log(`Error while deleting ${file.filename}`);
      }
    }
  }
  console.log("Job done!");
}

fetchData().then(process.exit);
