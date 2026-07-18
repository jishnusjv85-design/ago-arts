import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "tattoo_studio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);
let databaseReady = false;

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "dist"), { index: false }));

async function initializeDatabase() {
  if (databaseReady) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      style VARCHAR(100) NULL,
      placement VARCHAR(255) NULL,
      description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  databaseReady = true;
}

app.get("/api/health", async (_req, res) => {
  try {
    await initializeDatabase();
    res.json({ status: "ok", service: "obsidian-ink-api", database: "mysql" });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({ status: "error", service: "obsidian-ink-api", database: "mysql" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, style, placement, description } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    await initializeDatabase();

    const [result] = await pool.execute(
      "INSERT INTO bookings (name, email, phone, style, placement, description) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, phone, style || "Not sure yet", placement || "Not specified", description || ""]
    );

    const booking = {
      id: result.insertId,
      name,
      email,
      phone,
      style: style || "Not sure yet",
      placement: placement || "Not specified",
      description: description || "",
    };

    console.log(`New booking request received from ${email}`);
    return res.status(201).json({ message: "Booking request received.", booking });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return res.status(500).json({ message: "Unable to save booking request." });
  }
});

app.get("*", (_req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
    return;
  }

  res.status(404).send("The production build is not available yet. Run npm run build first.");
});

app.listen(port, () => {
  console.log(`Production server listening on http://localhost:${port}`);
  console.log("MySQL storage is enabled for booking submissions.");
});
