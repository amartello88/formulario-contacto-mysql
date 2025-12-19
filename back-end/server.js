import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ ok: true, rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error de conexión a MySQL" });
  }
});
app.post("/consulta", async (req, res) => {

  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  const {
    nombre,
    apellido,
    personas,
    mascotas,
    fecha_desde,
    fecha_hasta,
    consulta
  } = req.body;

  if (!nombre || !apellido || !personas || !fecha_desde || !fecha_hasta || !consulta) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const sql = `
      INSERT INTO consultas
      (nombre, apellido, personas, mascotas, fecha_desde, fecha_hasta, consulta)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
      nombre,
      apellido,
      personas,
      mascotas || "no",
      fecha_desde,
      fecha_hasta,
      consulta
    ]);

    res.status(201).json({
      ok: true,
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar la consulta" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
