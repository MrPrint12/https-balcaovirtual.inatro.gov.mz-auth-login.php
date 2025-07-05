const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/auth-login", (req, res) => {
  res.render("login", { error: null });
});

router.post("/auth-login", (req, res) => {
  const { code, birth } = req.body;
  db.get("SELECT * FROM users WHERE code = ? AND birth = ?", [code, birth], (err, user) => {
    if (user) {
      req.session.user = code;
      return res.redirect("/");
    }
    res.render("login", { error: "Credenciais inválidas!" });
  });
});

module.exports = router;
