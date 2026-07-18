import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT) || 3000;
const dataFilePath = path.join(__dirname, "data", "bookings.json");

app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "dist"), { index: false }));

async function readBookings() {
  if (!existsSync(dataFilePath)) {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
    await fs.writeFile(dataFilePath, "[]", "utf8");
    return [];
  }

  const raw = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(raw);
}

async function writeBookings(bookings) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(bookings, null, 2), "utf8");
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "obsidian-ink-api" });
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, style, placement, description } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    const bookings = await readBookings();
    const booking = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      style: style || "Not sure yet",
      placement: placement || "Not specified",
      description: description || "",
    };

    bookings.push(booking);
    await writeBookings(bookings);

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
});
