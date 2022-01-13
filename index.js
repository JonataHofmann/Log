const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const PORT = 8000;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.post("/", (req, res) => {
  const date = new Date();
  const {
    body: { type, message },
  } = req;
  const string = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()} - ${req.get(
    "origin"
  )}] ${message}`;

  if (type === "log") console.log("\x1b[0m", string);
  if (type === "warn") console.log("\x1b[33m", string);
  if (type === "info") console.log("\x1b[36m", string);
  if (type === "error") console.log("\x1b[31m", string);

  fs.appendFileSync("log.txt", string);

  return res.send("Express + TypeScript Server");
});
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
