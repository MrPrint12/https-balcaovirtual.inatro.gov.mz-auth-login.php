const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../database");

const upload = multer({ dest: "uploads/" });

router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/contact", (req, res) => {
  db.run('INSERT INTO messages (nome, email, mensagem) VALUES (?, ?, ?)',
    [req.body.nome, req.body.email, req.body.mensagem],
    () => res.send('Mensagem enviada com sucesso!')
  );
});

router.get("/mudanca-carta", (req, res) => {
  res.render("mudanca-carta");
});

router.post("/mudanca-carta", upload.single("documento"), (req, res) => {
  console.log("Pedido recebido:", req.body, req.file);
  res.send("Pedido de mudança de carta submetido!");
});

module.exports = router;
