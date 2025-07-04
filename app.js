const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "segredo",
  resave: false,
  saveUninitialized: true
}));

const authRoutes = require("./routes/auth");
const pageRoutes = require("./routes/pages");

app.use("/", authRoutes);
app.use("/", pageRoutes);

app.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("/auth-login");
  res.render("index", { user: req.session.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
