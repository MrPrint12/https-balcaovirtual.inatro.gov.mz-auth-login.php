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
  const { nome, email, mensagem } = req.body;
  db.run("INSERT INTO messages (nome, email, mensagem) VALUES (?, ?, ?)", [nome, email, mensagem], err => {
    if (err) return res.status(500).send("Erro ao enviar mensagem.");
    res.send("Mensagem enviada com sucesso!");
  });
});

router.get("/mudanca-carta", (req, res) => {
  res.render("mudanca-carta");
});

router.post("/mudanca-carta", upload.single("documento"), (req, res) => {
  if (!req.file) return res.status(400).send("Envie o documento.");
  res.send(`Pedido de mudança para ${req.body.nome} recebido. Arquivo: ${req.file.originalname}`);
});

module.exports = router;
