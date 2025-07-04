const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("users.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    birth TEXT NOT NULL
  )`);

  db.get("SELECT * FROM users WHERE code = 'USER001'", (err, row) => {
    if (!row) {
      db.run("INSERT INTO users (code, birth) VALUES (?, ?)", ["USER001", "1999-12-31"]);
    }
  });
});

module.exports = db;
