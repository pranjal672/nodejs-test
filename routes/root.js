const express = require("express");
const router = express.Router();
const path = require("path");

//send index.html
router.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

//send new-page.html
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

//redirect to new-page.html
router.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html");
});

module.exports = router;
