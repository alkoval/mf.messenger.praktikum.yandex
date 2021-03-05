const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.static("./dist/"));

app.get("*", (req, res) => {
  res.sendFile("./dist/index.html", { root: __dirname });
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
