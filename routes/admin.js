const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/admin", (req, res) => {
  db.all("SELECT * FROM users", (err, users) => {
    db.all("SELECT * FROM messages", (err2, messages) => {
      res.render("admin", { users, messages });
    });
  });
});

module.exports = router;
