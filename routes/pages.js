const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post("/contact", (req, res) => {
  // Simula envio
  console.log("Mensagem recebida:", req.body);
  res.send("Mensagem enviada com sucesso!");
});

router.get("/mudanca-carta", (req, res) => {
  res.render("mudanca-carta");
});

router.post("/mudanca-carta", upload.single("documento"), (req, res) => {
  console.log("Pedido recebido:", req.body, req.file);
  res.send("Pedido de mudança de carta submetido!");
});

module.exports = router;
